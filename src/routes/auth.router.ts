import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import { config } from "../config/config";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req;
      const payload = {
        sub: user?._id,
        role: user?.role,
      };

      const token = await jwt.sign(payload, config.jwtSecret as string);
      res.json({
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
