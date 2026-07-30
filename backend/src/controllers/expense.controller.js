import Expense from "../models/tracker_expense.model.js";
import Home from "../models/tracker_home.model.js";
import Category from "../models/tracker_catagory.model.js";

const createExpense = async (req, res) => {
  const { category, amount, title, description, paymentMethod, date, tracker } = req.body;

  try {
    if (!category || amount == null || !title || !paymentMethod || !tracker) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields.",
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

    const categoryExists = await Category.findOne({
      _id: category,
      user: req.user.id,
    });

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    const expense = await Expense.create({
      user: req.user.id,
      category,
      amount,
      title,
      description,
      paymentMethod,
      date,
      tracker,
    });

    return res.status(201).json({
      success: true,
      message: "Expense created successfully.",
      expense,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Failed to create expense.",
    });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id,
    })
      .populate("category", "name")
      .populate("tracker", "title");

    return res.status(200).json({
      success: true,
      expenses,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Failed to fetch expenses.",
    });
  }
};

const getExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id,
    })
      .populate("category", "name")
      .populate("tracker", "title");

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
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Failed to fetch expense.",
    });
  }
};

const updateExpense = async (req, res) => {
  const { category, amount, title, description, paymentMethod, date } = req.body;

  try {
    if (category) {
      const categoryExists = await Category.findOne({
        _id: category,
        user: req.user.id,
      });

      if (!categoryExists) {
        return res.status(404).json({
          success: false,
          message: "Category not found.",
        });
      }
    }

    const expense = await Expense.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        category,
        amount,
        title,
        description,
        paymentMethod,
        date,
      },
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
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Failed to update expense.",
    });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
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
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Failed to delete expense.",
    });
  }
};

export { createExpense, getExpenses, getExpense, updateExpense, deleteExpense };
