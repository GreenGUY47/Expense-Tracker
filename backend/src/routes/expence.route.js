import { Router } from "express";
import auth from "../middleware/verifyToken.middleware.js";
import {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} from "../controllers/home.controller.js";

const expenseRouter = Router();

expenseRouter.post("/", auth, createExpense);
expenseRouter.get("/", auth, getExpenses);
expenseRouter.get("/:id", auth, getExpenseById);
expenseRouter.patch("/:id", auth, updateExpense);
expenseRouter.delete("/:id", auth, deleteExpense);

export default expenseRouter;
