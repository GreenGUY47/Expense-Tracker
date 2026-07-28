import jwt from "jsonwebtoken";

export const accessToken = async (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m",
  });
};

export const refreshToken = async (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "10d",
  });
};

export const verifyAccessToken = async (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN);
};

export const verifyRefreshToken = async (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN);
};
