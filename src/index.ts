import express, { Request, Response, NextFunction, Application } from "express";
import routerApi from "./routes";
import { errorHandler, boomErrorHandler } from "./middlewares/error.handler";

const app: Application = express();

const port = 3000;

routerApi(app);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.send("<h1>Hola mi server en express</h1>");
});

app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port: ${port}`));
