import Joi from "joi";

const id = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const name = Joi.string().min(3).max(30);
const price = Joi.number();
const description = Joi.string();
const image = Joi.string().uri();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  category: id,
});

const updateProductSchema = Joi.object({
  name,
  price,
  description,
  image,
  category: id,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

export { createProductSchema, updateProductSchema, getProductSchema };
