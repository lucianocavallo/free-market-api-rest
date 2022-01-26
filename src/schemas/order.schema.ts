import Joi from "joi";

const id = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const products = Joi.array();

const createCustomerSchema = Joi.object({
  customer: id,
  products: products.required(),
});

const updateCustomerSchema = Joi.object({
  products,
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

export { createCustomerSchema, updateCustomerSchema, getCustomerSchema };
