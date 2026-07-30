import mongoose from "mongoose";

const expenseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please provide a category"],
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    title: {
      type: String,
      required: true,
      maxlength: 150,
    },
    description: {
      type: String,
      required: false,
      maxlength: 500,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: [
        "Cash",
        "Card Payment",
        "Digital Wallets",
        "Bank Transfers",
        "Buy Now, Pay Later (BNPL)",
        "Checks",
        "Cryptocurrency",
        "Mobile Billing",
        "Direct Carrier",
        "Other",
      ],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    tracker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Home",
      required: true,
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
