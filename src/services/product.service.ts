import { ProductModel } from "../models/product.model";
import { CategoryModel } from "../models/category.model";
import boom from "@hapi/boom";
import QueryString from "qs";

class ProductService {
  async create(data: InputProduct) {
    const product = new ProductModel(data);
    try {
      const newProduct = await product.save();
      const category = await CategoryModel.findById(product.category);
      category.products = [...category.products, newProduct._id];
      await category.save();

      return {
        newProduct,
        category,
      };
    } catch (error) {
      throw boom.conflict(error as string);
    }
  }

  async find(query: QueryString.ParsedQs) {
    const limit = query.limit as string;
    const offset = query.offset as string;
    if (limit && offset) {
      return await ProductModel.find()
        .skip(parseInt(offset))
        .limit(parseInt(limit));
    }
    return await ProductModel.find();
  }

  async findOne(id: string) {
    const product = await ProductModel.findById(id).populate("category");
    if (!product) {
      throw boom.notFound("product not found");
    }
    return product;
  }

  async update(id: string, changes: InputProduct) {
    const product = await ProductModel.findByIdAndUpdate(id, changes, {
      new: true,
    });
    if (!product) {
      throw boom.notFound("product not found");
    }
    return product;
  }

  async delete(id: string) {
    try {
      const product = await ProductModel.findByIdAndDelete(id);
      if (!product) {
        throw boom.notFound("product not found");
      }
      const category = await CategoryModel.findById(product.category);
      category.products.filter((item: string) => JSON.stringify(item) !== id);
      return { product, category };
    } catch (error) {
      throw boom.conflict(error as string);
    }
  }
}

export { ProductService };
