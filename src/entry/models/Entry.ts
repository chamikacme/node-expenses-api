import { EntryType } from "../enums/EntryType";
import { model, Schema, models } from "mongoose";

const EntrySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default models.Entry || model("Entry", EntrySchema);
