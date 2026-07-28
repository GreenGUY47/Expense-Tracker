import mongoose from "mongoose";
import bcrypt from "bcrypt";

const authSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Username is required..."],
    minlength: 3,
    maxlength: 20,
    trim: true,
    lowercase: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required..."],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required..."],
    minlength: 8,
  },
});

authSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

authSchema.methods.comparePassword = async function (password) {
  await bcrypt.compare(password, this.password);
};

const Auth = mongoose.model("Auth", authSchema);

export default Auth;
