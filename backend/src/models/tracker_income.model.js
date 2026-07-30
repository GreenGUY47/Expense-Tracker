import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
      minlength: 3,
      enum: [
        "Salary",
        "Business",
        "Freelance",
        "Gift",
        "Investment",
        "Saving",
        "Pocket-Money",
        "Other",
      ],
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      required: false,
    },
    tracker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Home",
      required: true,
    },
  },
  { timestamps: true }
);

incomeSchema.index({ tracker: 1, date: -1 });

const Income = mongoose.model("Income", incomeSchema);

export default Income;
