import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect("");

    console.log(connection);
  } catch (error) {
    return error;
  }
};

export default connectDB;
