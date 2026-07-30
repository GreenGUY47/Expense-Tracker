import Home from "../models/expenseTracker_home.model.js";

const createExpense = async (req, res) => {
  const { title, description } = req.body;

  try {
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required.",
      });
    }

    const expense = await Home.create({
      user: req.user.id,
      title,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Tracker created successfully.",
      expense,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Failed to create tracker.",
    });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Home.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: expenses.length,
      expenses,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch expenses.",
    });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const expense = await Home.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found.",
      });
    }

    return res.status(200).json({
      success: true,
      expense,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch expense.",
    });
  }
};

const updateExpense = async (req, res) => {
  try {
    const expense = await Home.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Expense updated successfully.",
      expense,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to update expense.",
    });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expense = await Home.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Expense deleted successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to delete expense.",
    });
  }
};

export { createExpense, getExpenses, getExpenseById, updateExpense, deleteExpense };
