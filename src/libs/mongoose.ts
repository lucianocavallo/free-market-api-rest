import mongoose from "mongoose";

async function connectDb(url: string) {
  mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.error(error));
}

export default connectDb;
