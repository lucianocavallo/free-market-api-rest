import express, { Request, Response, NextFunction } from "express";
import passport from "passport";

const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
