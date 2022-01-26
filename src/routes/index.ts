import { Application } from "express";

import productsRouter from "./products.router";
import usersRouter from "./users.router";
import categoriesRouter from "./categories.router";

function routerApi(app: Application) {
  app.use("/products", productsRouter);
  app.use("/users", usersRouter);
  app.use("/categories", categoriesRouter);
}

export default routerApi;
