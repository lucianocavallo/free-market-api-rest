import express, { Application } from "express";

import productsRouter from "./products.router";
import usersRouter from "./users.router";
import categoriesRouter from "./categories.router";
import customersRouter from "./customers.router";
import ordersRouter from "./orders.router";

const router = express.Router();

function routerApi(app: Application) {
  app.use("/api/v1", router);

  router.use("/products", productsRouter);
  router.use("/users", usersRouter);
  router.use("/categories", categoriesRouter);
  router.use("/customers", customersRouter);
  router.use("/orders", ordersRouter);
}

export default routerApi;
