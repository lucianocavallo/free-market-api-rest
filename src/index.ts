import express, { Request, Response, NextFunction, Application } from "express";
import routerApi from "./routes";

const app: Application = express();

const port = 3000;

routerApi(app);

app.use("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hola mi server en express");
});

app.listen(port, () => console.log(`Server running on port: ${port}`));
