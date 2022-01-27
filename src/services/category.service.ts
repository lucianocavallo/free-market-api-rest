import { CategoryModel } from "../models/category.model";
import boom from "@hapi/boom";
class CategoryService {
  async create(data: InputCategory) {
    const newCategory = new CategoryModel(data);
    try {
      return await newCategory.save();
    } catch (error) {
      throw boom.conflict(error as string);
    }
  }
  async find() {
    return await CategoryModel.find();
  }
  async findOne(id: string) {
    const category = await CategoryModel.findById(id);
    if (!category) {
      throw boom.notFound("category not found");
    }
    return category;
  }
  async update(id: string, changes: InputCategory) {
    const category = await CategoryModel.findByIdAndUpdate(id, changes, {
      new: true,
    });
    if (!category) {
      throw boom.notFound("category not found");
    }
    return category;
  }
  async delete(id: string) {
    const category = await CategoryModel.findByIdAndDelete(id);
    if (!category) {
      throw boom.notFound("category not found");
    }
    return category;
  }
}

export default CategoryService;
