import { OrderModel } from "../models/order.model";
import { CustomerModel } from "../models/customer.model";
import boom from "@hapi/boom";

class OrderService {
  async create(data: InputOrder) {
    const newOrder = new OrderModel(data);
    let order;
    try {
      order = await newOrder.save();
    } catch (error) {
      throw boom.conflict(error as string);
    }
    const customer = await CustomerModel.findById(order.customer);

    customer.orders = [...customer.orders, order._id];
    try {
      const updatedCustomer = await customer.save();
      return {
        order,
        updatedCustomer,
      };
    } catch (error) {
      throw boom.conflict(error as string);
    }
  }
  async find() {
    return await OrderModel.find();
  }
  async findOne(id: string) {
    const order = await OrderModel.findById(id)
      .populate("products")
      .populate("customer")
      .exec();
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
    try {
      const customer = await CustomerModel.findById(order.customer);
      customer.orders.filter(
        (item: string) => JSON.stringify(item) !== order._id
      );
    } catch (error) {
      throw boom.conflict(error as string);
    }

    return order;
  }
}

export { OrderService };
