import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json([
    { email: "juancito@mail.com", password: "admin123" },
    { email: "pepito@mail.com", password: "admin123" },
  ]);
});

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  res.status(200).json({
    id,
  });
});
export default router;
