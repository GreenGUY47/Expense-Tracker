import { Router } from "express";
import auth from "../middleware/verifyToken.middleware.js";

import {
  createIncome,
  getIncomes,
  getIncome,
  updateIncome,
  deleteIncome,
} from "../controllers/income.controller.js";

const router = Router();

router.post("/", auth, createIncome);
router.get("/", auth, getIncomes);
router.get("/:id", auth, getIncome);
router.patch("/:id", auth, updateIncome);
router.delete("/:id", auth, deleteIncome);

export default router;
