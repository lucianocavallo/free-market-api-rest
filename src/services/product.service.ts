import { ProductModel } from "../models/product.model";
import boom from "@hapi/boom";
class ProductService {
  async create(data: InputProduct) {
    const newProduct = new ProductModel(data);
    try {
      return await newProduct.save();
    } catch (error) {
      throw boom.conflict(error as string);
    }
  }
  async find() {
    return await ProductModel.find();
  }
  async findOne(id: string) {
    const product = await ProductModel.findById(id);
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
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) {
      throw boom.notFound("product not found");
    }
    return product;
  }
}

export default ProductService;
