import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },

    tracker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Home",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    period: {
      type: String,
      enum: ["monthly", "yearly"],
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 200,
    },
  },
  { timestamps: true }
);

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;
