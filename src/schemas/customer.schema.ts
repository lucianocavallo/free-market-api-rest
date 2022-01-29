import Joi from "joi";

const id = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const name = Joi.string().min(4);
const phone = Joi.string();
const orders = Joi.array();
const user = Joi.object({
  email: Joi.string().email(),
  password: Joi.string(),
});

const createCustomerSchema = Joi.object({
  user: user.required(),
  name: name.required(),
  phone: phone.required(),
});

const updateCustomerSchema = Joi.object({
  name,
  phone,
  orders,
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

export { createCustomerSchema, updateCustomerSchema, getCustomerSchema };
