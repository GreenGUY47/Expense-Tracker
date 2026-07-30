import { Router } from "express";
import auth from "../middleware/verifyToken.middleware.js";

import {
  createTracker,
  getTrackers,
  getTracker,
  updateTracker,
  deleteTracker,
} from "../controllers/home.controller.js";

const router = Router();

router.post("/", auth, createTracker);
router.get("/", auth, getTrackers);
router.get("/:id", auth, getTracker);
router.patch("/:id", auth, updateTracker);
router.delete("/:id", auth, deleteTracker);

export default router;
