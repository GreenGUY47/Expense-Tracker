import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const accessToken = (payload) => {
  return jwt.sign(
    {
      id: payload._id,
      userName: payload.userName,
      email: payload.email,
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: "1d",
    }
  );
};
const refreshToken = (payload) => {
  return jwt.sign(
    {
      id: payload._id,
    },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: "10d",
    }
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN);
};

export { accessToken, refreshToken, verifyAccessToken, verifyRefreshToken };
