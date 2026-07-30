import Income from "../models/tracker_income.model.js";
import Home from "../models/tracker_home.model.js";

const income = async (req, res) => {
  const { source, amount, date, description, tracker } = req.body;
  try {
    if (!source || amount == null || !date || !tracker) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }
    const useTracker = await Home.findOne({
      _id: tracker,
      owner: req.user.id,
    });
    if (!useTracker) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this tracker.",
      });
    }
    const income = await Income.create({
      source,
      amount,
      date,
      description,
      tracker,
    });
    res.status(201).json({
      success: true,
      message: "Income created successfully",
      income: income,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Failed to create income please try again later",
    });
  }
};

export default income;
