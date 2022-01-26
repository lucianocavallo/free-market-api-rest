import express, { Request, Response, NextFunction } from "express";
import ProductService from "../services/product.service";

const router = express.Router();
const service = new ProductService();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const products = await service.find();
  res.status(200).json(products);
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  // const { id } = req.params;
  const product = await service.findOne();
  res.status(200).json(product);
});

export default router;
