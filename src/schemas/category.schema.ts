import Joi from "joi";

const id = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const name = Joi.string().min(3).max(20);
const image = Joi.string().uri();
const products = Joi.array();

const createCategorySchema = Joi.object({
  name: name.required(),
  image: image.required(),
});

const updateCategorySchema = Joi.object({
  name,
  image,
  products,
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

export { createCategorySchema, updateCategorySchema, getCategorySchema };
