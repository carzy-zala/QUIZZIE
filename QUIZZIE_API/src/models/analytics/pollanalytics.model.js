import mongoose, { Schema } from "mongoose";

const pollAnalyticsSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  optionA: {
    type: Number,
    default: 0,
  },
  optionB: {
    type: Number,
    default: 0,
  },
  optionC: {
    type: Number,
    default: 0,
  },
  optionD: {
    type: Number,
    default: 0,
  },
});

export const PollAnalytic = mongoose.model("PollAnalytic", pollAnalyticsSchema);
