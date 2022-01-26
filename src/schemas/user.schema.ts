import Joi from "joi";

const id = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const email = Joi.string().email();
const password = Joi.string().alphanum();
const role = Joi.string();

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

const updateUserSchema = Joi.object({
  email,
  password,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

export { createUserSchema, updateUserSchema, getUserSchema };
