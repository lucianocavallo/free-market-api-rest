import passport from "passport";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";

passport.use(LocalStrategy);
passport.use(JwtStrategy);
