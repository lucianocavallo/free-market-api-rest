import express, { Request, Response, Application } from "express";

import routerApi from "./routes";
import { connectDb } from "./libs/mongoose";
import { config } from "./config/config";
import { errorHandler, boomErrorHandler } from "./middlewares/error.handler";
import { corsApi } from "./utils/cors";

connectDb(config.mongoDbUri);

const app: Application = express();

app.use(express.json());
app.use(corsApi());

import "./utils/auth";

routerApi(app);

app.use("/", (req: Request, res: Response) => {
  res.send("<h1>Hola mi server en express</h1>");
});

app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(config.port, () =>
  console.log(`Server running on port: ${config.port}`)
);
