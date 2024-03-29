import express, { Request, Response, NextFunction } from "express";
import passport from "passport";

import { AuthService } from "../services/auth.service";

const router = express.Router();
const service = new AuthService();

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req;
      const servRes = await service.signToken(user as JwtUser);
      res.json(servRes);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/recovery",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const servRes = await service.sendRecovery(email);
      res.json(servRes);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/change-password",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token, newPassword } = req.body;
      const servRes = await service.changePassword(token, newPassword);
      res.json(servRes);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
