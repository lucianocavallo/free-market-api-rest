import express, { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service";
import passport from "passport";

import {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
} from "../schemas/user.schema";
import { validatorHandler } from "../middlewares/validator.handler";

const router = express.Router();
const service = new UserService();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(createUserSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const users = await service.create(body);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await service.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const servRes = await service.update(id, body);
      res.status(200).json(servRes);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const servRes = await service.delete(id);
      res.status(200).json(servRes);
    } catch (error) {
      next(error);
    }
  }
);
export default router;
