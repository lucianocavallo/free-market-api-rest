import express, { Request, Response, NextFunction } from "express";

import { ProductService } from "../services/product.service";
import { validatorHandler } from "../middlewares/validator.handler";
import {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
} from "../schemas/product.schema";

const router = express.Router();
const service = new ProductService();

router.post(
  "/",
  validatorHandler(createProductSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const newProduct = await service.create(body);
      res.status(200).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await service.find(req.query);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const product = await service.update(id, body);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await service.delete(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
