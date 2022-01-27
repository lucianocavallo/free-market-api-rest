import { CustomerModel } from "../models/customer.model";
import boom from "@hapi/boom";

class CustomerService {
  async create(data: InputCustomer) {
    const newCustomer = new CustomerModel(data);
    try {
      return await newCustomer.save();
    } catch (error) {
      throw boom.conflict(error as string);
    }
  }
  async find() {
    return await CustomerModel.find();
  }
  async findOne(id: string) {
    const customer = await CustomerModel.findById(id);
    if (!customer) {
      throw boom.notFound("customer not found");
    }
    return customer;
  }
  async update(id: string, changes: InputCustomer) {
    const customer = await CustomerModel.findByIdAndUpdate(id, changes, {
      new: true,
    });
    if (!customer) {
      throw boom.notFound("customer not found");
    }
    return customer;
  }
  async delete(id: string) {
    const customer = await CustomerModel.findByIdAndDelete(id);
    if (!customer) {
      throw boom.notFound("customer not found");
    }
    return customer;
  }
}

export default CustomerService;
