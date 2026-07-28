import register from "../controllers/register.controller.js";
import { Router } from "express";
import validate from "../middleware/validate.middleware.js";
import { registerSchema } from "../validators/auth.validator.js";

const router = Router();

router.post("/api/auth", validate(registerSchema), register);
