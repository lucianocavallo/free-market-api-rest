import { CustomerModel } from "../models/customer.model";
import { UserModel } from "../models/user.model";
import boom from "@hapi/boom";
import bcrypt from "bcrypt";

class CustomerService {
  async create(data: InputCustomer) {
    const { user } = data;
    const hash = await bcrypt.hash(user.password, 10);
    const newUser = new UserModel({
      ...user,
      password: hash,
      role: "customer",
    });
    let userRes;
    try {
      userRes = await newUser.save();
    } catch (error) {
      throw boom.conflict(error as string);
    }
    const newCustomer = new CustomerModel({ ...data, user: userRes._id });
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
    const customer = await CustomerModel.findById(id).populate(
      "user",
      "-password"
    );
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
    const user = await UserModel.findByIdAndDelete(customer.user);
    return { user, customer };
  }
}

export default CustomerService;
