import Category from "../models/tracker_catagory.model.js";
import Auth from "../models/auth.model.js";
import { accessToken, refreshToken } from "../services/token.service.js";

const register = async (req, res) => {
  const { userName, email, password } = req.body;
  const avatar = req.file;

  try {
    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: `Please fill all the require fields...`,
      });
    }
    const existUser = await Auth.findOne({
      $or: [{ email }, { userName }],
    });
    if (existUser) {
      return res.status(400).json({
        success: false,
        message: `User already existed.`,
      });
    }
    const newUser = await Auth.create({
      userName,
      email,
      password,
    });
    const defaultCategories = [
      { name: "Food" },
      { name: "Transport" },
      { name: "Rent" },
      { name: "Bills" },
      { name: "Shopping" },
      { name: "Entertainment" },
      { name: "Healthcare" },
      { name: "Education" },
      { name: "Other" },
    ];

    await Category.insertMany(
      defaultCategories.map((category) => ({
        ...category,
        user: newUser._id,
      }))
    );
    const access = accessToken(newUser);
    const refresh = refreshToken(newUser);
    newUser.refreshToken = refresh;
    await newUser.save({ validateBeforeSave: false });
    res.cookie("refreshToken", refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      success: true,
      message: "New user created successfully ✅",
      newUser: userName,
      accessToken: access,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Failed to create user!!!",
    });
  }
};

export default register;
