import express, { Request, Response, NextFunction } from "express";
import passport from "passport";

import { CategoryService } from "../services/category.service";
import { checkRoles } from "../middlewares/auth.handler";
import { validatorHandler } from "../middlewares/validator.handler";
import {
  getCategorySchema,
  createCategorySchema,
  updateCategorySchema,
} from "../schemas/category.schema";

const router = express.Router();
const service = new CategoryService();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles(["admin", "seller"]),
  validatorHandler(createCategorySchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const category = await service.create(body);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await service.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getCategorySchema, "params"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles(["admin", "seller"]),
  validatorHandler(getCategorySchema, "params"),
  validatorHandler(updateCategorySchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const category = await service.update(id, body);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles(["admin", "seller"]),
  validatorHandler(getCategorySchema, "params"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const category = await service.delete(id);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);
export default router;
