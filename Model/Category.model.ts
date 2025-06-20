import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: String,
    avatar: String,
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

export default mongoose.model("Category", categorySchema, "Category");
