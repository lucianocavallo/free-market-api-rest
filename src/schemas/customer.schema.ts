import Joi from "joi";

const id = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const firstName = Joi.string().min(3).max(20);
const lastName = Joi.string().min(3).max(20);
const phone = Joi.string();
const orders = Joi.array();

const createCustomerSchema = Joi.object({
  user: id,
  firstName: firstName.required(),
  lastName: lastName.required(),
  phone: phone.required(),
});

const updateCustomerSchema = Joi.object({
  firstName,
  lastName,
  phone,
  orders,
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

export { createCustomerSchema, updateCustomerSchema, getCustomerSchema };
