import Category from "../models/category.model.js";

const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
    }

    const exists = await Category.findOne({
      user: req.user.id,
      name: name.trim(),
    });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Category already exists.",
      });
    }

    const category = await Category.create({
      user: req.user.id,
      name: name.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully.",
      category,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Failed to create category.",
    });
  }
};

export default createCategory;