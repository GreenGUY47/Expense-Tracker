import Income from "../models/tracker_income.model.js";
import Home from "../models/tracker_home.model.js";

const createIncome = async (req, res) => {
  const { source, amount, date, description, tracker } = req.body;

  try {
    if (!source || amount == null || !tracker) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const trackerExists = await Home.findOne({
      _id: tracker,
      user: req.user.id,
    });

    if (!trackerExists) {
      return res.status(404).json({
        success: false,
        message: "Tracker not found.",
      });
    }

    const income = await Income.create({
      user: req.user.id,
      source,
      amount,
      date,
      description,
      tracker,
    });

    return res.status(201).json({
      success: true,
      message: "Income created successfully.",
      income,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Failed to create income.",
    });
  }
};

const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({
      user: req.user.id,
    }).populate("tracker", "title");

    return res.status(200).json({
      success: true,
      incomes,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Failed to fetch incomes.",
    });
  }
};

const getIncome = async (req, res) => {
  try {
    const income = await Income.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).populate("tracker", "title");

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found.",
      });
    }

    return res.status(200).json({
      success: true,
      income,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Failed to fetch income.",
    });
  }
};

const updateIncome = async (req, res) => {
  const { source, amount, date, description } = req.body;

  try {
    const income = await Income.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        source,
        amount,
        date,
        description,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Income updated successfully.",
      income,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Failed to update income.",
    });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Income deleted successfully.",
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Failed to delete income.",
    });
  }
};

export { createIncome, getIncomes, getIncome, updateIncome, deleteIncome };
