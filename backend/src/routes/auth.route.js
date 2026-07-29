import register from "../controllers/register.controller.js"
import { Router } from "express"


const router = Router()


router.post("/register", register);








export default router;