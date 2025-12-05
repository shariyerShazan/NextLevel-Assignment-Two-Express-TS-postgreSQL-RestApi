import type { Response } from "express";
import type { AuthRequest } from "../../middlewares/isAuthed.js";
import { UserServices } from "./user.service.js";

export class UserController {
    static getUsers = async (req: AuthRequest, res: Response) => {
        console.log('getUsers called'); // Debug log
        
        try {
            console.log('Calling UserServices.findAll...'); // Debug log
            const users = await UserServices.findAll();
            console.log('Users found:', users.length); // Debug log
            
            res.status(200).json({
                message: "All users Here!",
                users
            });
        } catch (error: any) {
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                name: error.name
            });
            
            const statusCode = error.message === "No user found!" ? 404 : 500;
            
            return res.status(statusCode).json({
                message: error.message || "Internal server error",
                success: false,
            });
        }
    }
}