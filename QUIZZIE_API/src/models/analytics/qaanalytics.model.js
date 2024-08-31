import mongoose, { Schema } from "mongoose";

const qaAnlyticsScheme = new Schema({
  attempt: {
    type: Number,
    default: 0,
  },
  correctAns: {
    type: Number,
    default: 0,
  },
  wrongAns: {
    type: Number,
    default: 0,
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
});

export const QaAnalytic = mongoose.model("QaAnalytic", qaAnlyticsScheme);
