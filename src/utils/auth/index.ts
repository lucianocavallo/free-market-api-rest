import passport from "passport";
import { LocalStrategy } from "./strategies/local.strategy";

passport.use(LocalStrategy);
