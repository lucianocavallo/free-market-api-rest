import express, { Request, Response, Application } from "express";
import routerApi from "./routes";
import connectDb from "./libs/mongoose";
import { config } from "./config/config";
import { errorHandler, boomErrorHandler } from "./middlewares/error.handler";

connectDb(config.mongoDbUri);

const app: Application = express();

const port = 3000;

routerApi(app);

app.use("*", (req: Request, res: Response) => {
  res.send("<h1>Hola mi server en express</h1>");
});

app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port: ${port}`));
