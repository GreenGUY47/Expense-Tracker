import Auth from "../models/auth.model.js";
import bcrypt from "bcrypt";
import { accessToken, refreshToken } from "../services/token.service.js";

const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    if (!userName || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the require fields",
      });
    }
    const user = await Auth.findOne({
      userName,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid username or password",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password",
      });
    }
    const access = accessToken(user);
    const refresh = refreshToken(user);

    res.status(200).json({
      success: true,
      message: "Login successfully",
      accessToken: access,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to login please try again later",
    });
  }
};

export default login;
