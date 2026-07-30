import Budget from "../models/budget.model.js";
import Home from "../models/tracker_home.model.js";

const createBudget = async (req, res) => {
  const {
    tracker,
    amount,
    period,
    startDate,
    endDate,
    description,
  } = req.body;

  try {
    if (
      !tracker ||
      amount == null ||
      !period ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields.",
      });
    }

    const trackerExists = await Home.findOne({
      _id: tracker,
      owner: req.user.id,
    });

    if (!trackerExists) {
      return res.status(404).json({
        success: false,
        message: "Tracker not found.",
      });
    }

    const budget = await Budget.create({
      user: req.user.id,
      tracker,
      amount,
      period,
      startDate,
      endDate,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Budget created successfully.",
      budget,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Failed to create budget.",
    });
  }
};

export default createBudget;