import { UserModel } from "../models/user.model";
import boom from "@hapi/boom";
class UserService {
  async create(data: InputUser) {
    const newUser = new UserModel(data);
    try {
      return await newUser.save();
    } catch (error) {
      throw boom.conflict(error as string);
    }
  }
  async find() {
    return await UserModel.find();
  }
  async findOne(id: string) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw boom.notFound("user not found");
    }
    return user;
  }
  async update(id: string, changes: InputUser) {
    const user = await UserModel.findByIdAndUpdate(id, changes, { new: true });
    if (!user) {
      throw boom.notFound("user not found");
    }
    return user;
  }
  async delete(id: string) {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      throw boom.notFound("user not found");
    }
    return user;
  }
}

export default UserService;
