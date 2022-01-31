import express, { Request, Response, NextFunction } from "express";

import { CustomerService } from "../services/customer.service";
import { validatorHandler } from "../middlewares/validator.handler";
import {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
} from "../schemas/customer.schema";

const router = express.Router();
const service = new CustomerService();

router.post(
  "/",
  validatorHandler(createCustomerSchema, "body"),
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
  validatorHandler(getCustomerSchema, "params"),
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

router.get(
  "/by-user-id/:id",
  validatorHandler(getCustomerSchema, "params"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await service.findByUserId(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validatorHandler(getCustomerSchema, "params"),
  validatorHandler(updateCustomerSchema, "body"),
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
  validatorHandler(getCustomerSchema, "params"),
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
