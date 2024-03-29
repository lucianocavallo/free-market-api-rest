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

  async sendRecovery(email: string) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw (boom.unauthorized(), false);
    }
    const payload = {
      sub: user._id,
    };
    const token = jwt.sign(payload, config.jwtSecret as string, {
      expiresIn: "15m",
    });
    const link = `http://localhost:5500/recovery?token=${token}`;
    await service.update(user._id, { recoveryToken: token });
    const mail = {
      from: config.smtpEmail as string,
      to: user.email,
      subject: "Hello from nodemailer!",
      html: `<b>Ingresa a este link => ${link}</b>`,
    };
    return await this.sendMail(mail);
  }

  async sendMail(infoMail: InfoMail) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPass,
      },
    });
    const info = await transporter.sendMail(infoMail);
    return { message: "mail sent", info };
  }

  async changePassword(token: string, newPassword: string) {
    try {
      const payload = jwt.verify(token, config.jwtSecret as string);
      const user = await service.findOne(payload.sub as string);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized;
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user._id, { recoveryToken: "", password: hash });
      return { message: "password changed" };
    } catch (error) {
      throw boom.unauthorized();
    }
  }
}

export { AuthService };
