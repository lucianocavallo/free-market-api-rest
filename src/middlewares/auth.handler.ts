import boom from "@hapi/boom";
import { Request, Response, NextFunction } from "express";
import { config } from "../config/config";

function checkApiKey(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers["api"];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkRoles(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    if (roles.includes(user?.role as string)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
}

export { checkApiKey, checkRoles };
