import { Router } from "express";
import { isAuthed } from "../../middlewares/isAuthed.js";
import { authorize } from "../../middlewares/role-base-authorize.js";
import { UserController } from "./user.controller.js";
import { validate } from "../../middlewares/validate.js";
import { UpdateUserSchema } from "./dto/update-user-dto.js";

const router = Router()



/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management
 */

/**
 * @swagger
 * /api/v1/users/:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             example:
 *               message: "Here is all users!"
 *               success: true
 *               users:
 *                 - id: 1
 *                   name: "John Doe"
 *                   email: "john@example.com"
 *                   phone: "0123456789"
 *                   role: "customer"
 *                 - id: 2
 *                   name: "Admin User"
 *                   email: "admin@example.com"
 *                   phone: "0987654321"
 *                   role: "admin"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/" , isAuthed , authorize(["admin"]) , UserController.getUsers)


/**
 * @swagger
 * /api/v1/users/{userId}:
 *   delete:
 *     summary: Delete a user by ID (admin only)
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         example: "1"
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User deleted successfully!"
 *               success: true
 *       400:
 *         description: Can't delete user
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:userId" , isAuthed , authorize(["admin"]) , UserController.deleteCustomer)


/**
 * @swagger
 * /api/v1/users/{userId}:
 *   put:
 *     summary: Update a user by ID (admin can update any user's role and own details.. and user can only update own details without role)
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         example: "1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               phone:
 *                 type: string
 *                 example: "0123456789"
 *               role:
 *                 type: string
 *                 enum: [admin, customer]
 *                 example: "customer"
 *             required:
 *               - name
 *               - email
 *               - phone
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User updated successfully!"
 *               success: true
 *               user:
 *                 id: 1
 *                 name: "John Doe"
 *                 email: "john@example.com"
 *                 phone: "0123456789"
 *                 role: "customer"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               errors:
 *                 - path: "email"
 *                   message: "Invalid email address"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Unauthorized"
 *       403:
 *         description: Forbidden (customer trying to update another user)
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Forbidden: Cannot update other user's profile"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "User not found!"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal server error!"
 */
router.put("/:userId" , validate(UpdateUserSchema), isAuthed , authorize(["admin" , "customer"]) , UserController.updateUser)

export default router