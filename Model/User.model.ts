import mongoose from "mongoose";
import { generateRandomString } from "../helper/generate.helper";
const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    token:{
      type: String,
      default: ()=> generateRandomString(30)
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema, "User");