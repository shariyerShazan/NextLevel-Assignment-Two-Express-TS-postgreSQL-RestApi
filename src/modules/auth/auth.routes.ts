import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { RegisterUserSchema } from "./dto/register-user-dto.js";
import { AuthController } from "./auth.controller.js";
import { LoginUserSchema } from "./dto/login-user-dto.js";

const router = Router();

router.post("/signup", validate(RegisterUserSchema) , AuthController.registerUser);
router.post("/signin", validate(LoginUserSchema) , AuthController.loginUser);

export default router