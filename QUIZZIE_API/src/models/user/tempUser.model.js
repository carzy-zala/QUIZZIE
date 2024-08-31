import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";
import { Quiz } from "../quiz/quiz.model.js";

const tempUserSchema = new Schema({
  quizId: {
    type: Schema.Types.ObjectId,
    ref: Quiz,
    default: 0,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  tempAccessToken: {
    type: String,
  },
});

tempUserSchema.methods.generateAccessToken = function (quizType) {
  return jwt.sign(
    {
      id: this.id,
      quizType,
    },
    process.env.TEMP_USER_ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.TEMP_USER_ACCESS_TOKEN_TIME,
    }
  );
};

export const Tempuser = mongoose.model("Tempuser", tempUserSchema);
