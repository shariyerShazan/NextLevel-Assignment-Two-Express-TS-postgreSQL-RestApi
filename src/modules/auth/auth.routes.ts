import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { RegisterUserSchema } from "./dto/register-user-dto.js";
import { AuthController } from "./auth.controller.js";

const router = Router();

router.post("/signup", validate(RegisterUserSchema) , AuthController.registerUser);

export default router