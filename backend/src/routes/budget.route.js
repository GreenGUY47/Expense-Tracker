import { Router } from "express";
import auth from "../middleware/verifyToken.middleware.js";

import {
  createBudget,
  getBudgets,
  getBudget,
  updateBudget,
  deleteBudget,
} from "../controllers/budget.controller.js";

const router = Router();

router.post("/", auth, createBudget);
router.get("/", auth, getBudgets);
router.get("/:id", auth, getBudget);
router.patch("/:id", auth, updateBudget);
router.delete("/:id", auth, deleteBudget);

export default router;
