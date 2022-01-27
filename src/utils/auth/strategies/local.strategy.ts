import { Strategy } from "passport-local";
import boom from "@hapi/boom";
import bcrypt from "bcrypt";
import UserService from "../../../services/user.service";

const service = new UserService();

const LocalStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      const user = await service.findByEmail(email);
      if (!user) {
        done(boom.unauthorized(), false);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        done(boom.unauthorized(), false);
      }
      delete user._doc.password;
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

export { LocalStrategy };
