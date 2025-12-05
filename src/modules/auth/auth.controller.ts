import type { Request, Response } from "express";
import { AuthServices } from "./auth.service.js";
import type { RegisterUserDto } from "./dto/register-user-dto.js";
import type { LoginUserDto } from "./dto/login-user-dto.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()


export class AuthController {
   static async registerUser(req: Request , res: Response){
         try {
            const dto: RegisterUserDto = req.body;
            const user = await AuthServices.register(dto);
            return res.status(201).json({
              message: "User created successfully!",
              success: true,
              data: user
            });
         } catch (error : any) {
            console.error(error);
            return res.status(400).json({
                message: error.message || "Internal server error",
                success: false,
            });
         }
   }

   static async loginUser(req: Request , res: Response){
    try {
        const dto : LoginUserDto = req.body
        const user = await AuthServices.login(dto)
        const token = jwt.sign({userId: user.id , role: user.role } ,process.env.JWT_SECRET!,  { expiresIn: "7d" })
        return res.status(200).cookie("token" ,token , {httpOnly: true , sameSite: "strict" ,  secure: process.env.NODE_ENV === "production", maxAge: 7 * 24 * 60 * 60 * 1000,  path: "/"}).json({
            success: true, 
            message: `Welcome back ${user.name}`,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
              },
        })
    } catch (error : any) {
        console.error(error);
        return res.status(400).json({
            message: error.message || "Internal server error",
            success: false,
        });
    }
   }
}