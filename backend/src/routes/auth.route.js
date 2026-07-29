import { Router } from "express";
import validator from "../validators/zod.validator.js";
import registerSchema from "../middleware/validator.middleware.js";
import register from "../controllers/register.controller.js";

const router = Router();

router.post("/register", validator(registerSchema), register);

export default router;
