import Joi from "joi";

const id = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const products = Joi.array();

const createOrderSchema = Joi.object({
  customer: id,
  products: products.required(),
});

const updateOrderSchema = Joi.object({
  products,
});

const getOrderSchema = Joi.object({
  id: id.required(),
});

export { createOrderSchema, updateOrderSchema, getOrderSchema };
