import { OrderModel } from "../models/order.model";
import boom from "@hapi/boom";

class OrderService {
  async create(data: InputOrder) {
    const newOrder = new OrderModel(data);
    try {
      return await newOrder.save();
    } catch (error) {
      throw boom.conflict(error as string);
    }
  }
  async find() {
    return await OrderModel.find();
  }
  async findOne(id: string) {
    const order = await OrderModel.findById(id);
    if (!order) {
      throw boom.notFound("order not found");
    }
    return order;
  }
  async update(id: string, changes: InputOrder) {
    const order = await OrderModel.findByIdAndUpdate(id, changes, {
      new: true,
    });
    if (!order) {
      throw boom.notFound("order not found");
    }
    return order;
  }
  async delete(id: string) {
    const order = await OrderModel.findByIdAndDelete(id);
    if (!order) {
      throw boom.notFound("order not found");
    }
    return order;
  }
}

export { OrderService };
