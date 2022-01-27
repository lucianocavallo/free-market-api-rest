import { Strategy, ExtractJwt } from "passport-jwt";
import { config } from "../../../config/config";

const JwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
  },
  (payload, done) => {
    return done(null, payload);
  }
);

export { JwtStrategy };
