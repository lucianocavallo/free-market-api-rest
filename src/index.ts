import express, { Request, Response, NextFunction, Application } from "express";
import routerApi from "./routes";

const app: Application = express();

const port = 3000;

routerApi(app);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.send("<h1>Hola mi server en express</h1>");
});

app.listen(port, () => console.log(`Server running on port: ${port}`));
