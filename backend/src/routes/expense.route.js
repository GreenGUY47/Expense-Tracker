import { Router } from "express";
import auth from "../middleware/verifyToken.middleware.js";

import {
  createExpense,
  getExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expense.controller.js";

const router = Router();

router.post("/", auth, createExpense);
router.get("/", auth, getExpenses);
router.get("/:id", auth, getExpense);
router.patch("/:id", auth, updateExpense);
router.delete("/:id", auth, deleteExpense);

export default router;
