import Auth from "../models/auth.model.js";

const register = async () => {
  const { userName, email, password } = req.body;
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
      return res.status(401).json({
        success: false,
        message: "Invalid email or password...",
      });
    }
    const user = await Auth.create({
      userName,
      email,
      password,
    });
    res.status(201).json({
      success: true,
      message: "New user created successfully... ",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Internal server issue: Error Code 500, error message => ${err.message} `,
    });
  }
};

export default register;
