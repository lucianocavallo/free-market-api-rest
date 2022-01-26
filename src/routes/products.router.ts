import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json([
    { name: "Camisa 1", price: 10 },
    { name: "camisa 2", price: 15 },
  ]);
});

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  res.status(200).json({
    id,
  });
});

export default router;
