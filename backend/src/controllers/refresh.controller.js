import Auth from "../models/auth.model.js";
import { accessToken, verifyRefreshToken } from "../services/token.service.js";

const refreshAccessToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is required.",
      });
    }

    const decoded = verifyRefreshToken(token);

    const user = await Auth.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const isValid = await user.compareRefreshToken(token);

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token.",
      });
    }
    const newAccessToken = accessToken(user);

    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token.",
    });
  }
};

export default refreshAccessToken;
