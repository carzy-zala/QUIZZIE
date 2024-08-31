import mongoose, { Schema } from "mongoose";

const quizSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    quizType: {
      type: String,
      enum: ["qa", "poll"],
      required: true,
    },
    impression: {
      type: Number,
      default: 0,
    },
    noOfQuestions: {
      type: Number,
      default: 0,
    },
    
  },
  { timestamps: true }
);

quizSchema.index({ title: 1, createdBy: 1 }, { unique: true });

export const Quiz = mongoose.model("Quiz", quizSchema);
