import Auth from "../models/auth.model.js";

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
    res.status(201).json({
      success: true,
      message: "New user created successfully ✅",
      newUser: userName,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Failed to create user!!!",
    });
  }
};

export default register;
