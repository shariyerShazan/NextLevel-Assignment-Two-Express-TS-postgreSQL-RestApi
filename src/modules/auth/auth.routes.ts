import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { RegisterUserSchema } from "./dto/register-user-dto.js";
import { AuthController } from "./auth.controller.js";
import { LoginUserSchema } from "./dto/login-user-dto.js";

const router = Router();


/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication routes
 */

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Shazan"
 *               email:
 *                 type: string
 *                 example: "shazan@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               phone:
 *                 type: string
 *                 example: "01712345678"
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User registered successfully!"
 *               success: true
 *               user:
 *                 id: 1
 *                 name: "Shazan"
 *                 email: "shazan@example.com"
 *                 phone: "01712345678"
 *                 role: "customer"
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */

router.post("/signup", validate(RegisterUserSchema) , AuthController.registerUser);


/**
 * @swagger
 * /api/v1/auth/signin:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "shazan@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Welcome back!"
 *               success: true
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */

router.post("/signin", validate(LoginUserSchema) , AuthController.loginUser);

export default router