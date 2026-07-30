import Budget from "../models/tracker_budget.model.js";
import Home from "../models/tracker_home.model.js";

const createBudget = async (req, res) => {
  const { tracker, amount, period, startDate, endDate, description } = req.body;

  try {
    if (!tracker || amount == null || !period || !startDate || !endDate) {
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

const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({
      user: req.user.id,
    }).populate("tracker", "title");

    return res.status(200).json({
      success: true,
      budgets,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Failed to fetch budgets.",
    });
  }
};

const getBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).populate("tracker", "title");

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found.",
      });
    }

    return res.status(200).json({
      success: true,
      budget,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Failed to fetch budget.",
    });
  }
};

const updateBudget = async (req, res) => {
  const { amount, period, startDate, endDate, description } = req.body;

  try {
    const budget = await Budget.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        amount,
        period,
        startDate,
        endDate,
        description,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Budget updated successfully.",
      budget,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Failed to update budget.",
    });
  }
};

const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Budget deleted successfully.",
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Failed to delete budget.",
    });
  }
};

export { createBudget, getBudgets, getBudget, updateBudget, deleteBudget };
