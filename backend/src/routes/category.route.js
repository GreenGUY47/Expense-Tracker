import { Router } from "express";
import auth from "../middleware/verifyToken.middleware.js";

import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const router = Router();

router.post("/", auth, createCategory);
router.get("/", auth, getCategories);
router.get("/:id", auth, getCategory);
router.patch("/:id", auth, updateCategory);
router.delete("/:id", auth, deleteCategory);

export default router;
