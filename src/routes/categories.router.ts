import express, { Request, Response, NextFunction } from "express";
import CategoryService from "../services/category.service";

const router = express.Router();
const service = new CategoryService();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const categories = await service.find();
  res.status(200).json(categories);
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  // const { id } = req.params;
  const category = await service.findOne();
  res.status(200).json(category);
});
export default router;
