import express, { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service";

const router = express.Router();
const service = new UserService();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await service.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const { id } = req.params;
    const user = await service.findOne();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});
export default router;
