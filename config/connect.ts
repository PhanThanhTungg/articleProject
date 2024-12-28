import mongoose from "mongoose";

export default async():Promise<void>=>{
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connect to database successfully");
  } catch (error) {
    console.log("connect to database unsuccessfully");
  }
}