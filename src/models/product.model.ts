import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProductModel = model("Product", ProductSchema);

export { ProductModel };
