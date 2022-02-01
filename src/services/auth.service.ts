import boom from "@hapi/boom";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import { UserService } from "./user.service";
import { config } from "../config/config";

const service = new UserService();

class AuthService {
  async getUser(email: string, password: string) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw (boom.unauthorized(), false);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw (boom.unauthorized(), false);
    }
    delete user._doc.password;
    return user;
  }

  async signToken(user: JwtUser) {
    const payload = {
      sub: user?._id,
      role: user?.role,
    };

    const token = jwt.sign(payload, config.jwtSecret as string);
    return {
      user,
      token,
    };
  }

  async sendMail(email: string) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw (boom.unauthorized(), false);
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPass,
      },
    });
    const info = await transporter.sendMail({
      from: config.smtpEmail,
      to: user.email,
      subject: "Hello from nodemailer!",
      text: "Hello nodemailer",
      html: "<b>Hello nodemailer!</b>",
    });
    return { message: "mail sent", info };
  }
}

export { AuthService };
