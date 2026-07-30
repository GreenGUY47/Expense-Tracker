import Expense from "../models/tracker_expense.model.js";
import Home from "../models/tracker_home.model.js"
import Category from "../models/category.model.js";


const expense = async ( req, res ) => {
    const { category, amount, title, description, paymentMethod, date,tracker } = req.body;
    try{
        if(!category || amount == null || !title || !paymentMethod || !tracker){
            return res.status(400).json({
                success: false,
                message: "Please fill all the require fields."
            })
        }
        const Tracker = await Home.findOne({
            _id: tracker,
            owner: req.user.id
        })
         if (!Tracker) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this tracker.",
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
        tracker
    })
       res.status(201).json({
      success: true,
      message: "expense created successfully",
      expense,
    });
    } catch(err){
        return res.status(err.status || 500).json({
            success: false,
            message: err.message || "Failed to create expense"
        })
    }
}

export default expense