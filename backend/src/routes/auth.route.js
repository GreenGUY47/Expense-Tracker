import { Router } from "express";
import validator from "../validators/zod.validator.js";
import registerSchema from "../middleware/register.validator.middleware.js";
import loginSchema from "../middleware/login.validator.middleware.js";
import register from "../controllers/register.controller.js";
import login from "../controllers/login.controller.js";

const authRouter = Router();

authRouter.post("/register", validator(registerSchema), register);
authRouter.post("/login", validator(loginSchema), login);

export default authRouter;
