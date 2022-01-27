import { Request, Response, NextFunction } from "express";
import boom from "@hapi/boom";
import { ObjectSchema } from "joi";

function validatorHandler(schema: ObjectSchema, property: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error.details[0].message));
    }
    next();
  };
}

export { validatorHandler };
