import express, { Request, Response, NextFunction } from "express";

const app = express();

const port = 3000;

app.use("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hola mi server en express");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
