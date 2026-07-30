import mongoose from "mongoose";

const homeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 500,
      trim: true,
    },
  },
  { timestamps: true }
);

const Home = mongoose.model("Home", homeSchema);

export default Home;
