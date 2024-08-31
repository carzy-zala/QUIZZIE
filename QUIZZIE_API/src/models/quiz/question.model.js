import mongoose, { Schema } from "mongoose";
import { optionSchema } from "./option.model.js";

const questionSchema = new Schema({
  quizId: {
    type: Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  timer: {
    type: String,
    default: "",
  },
  optionType: {
    type: String,
    enum: ["text", "image", "textImage"],
    required: true,
  },
  options: {
    type: [optionSchema],
    validate: [arrayLimit, "{PATH} must have at least 2 options"],
  },
});

function arrayLimit(val) {
  return val.length >= 2;
}

export const Question = mongoose.model("Question", questionSchema);
