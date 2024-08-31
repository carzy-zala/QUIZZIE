  import mongoose, { Schema } from "mongoose";

export const optionSchema = new Schema({
  text: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
});
