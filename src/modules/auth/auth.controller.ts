import type { Request, Response } from "express";
import { AuthServices } from "./auth.service.js";
import type { RegisterUserDto } from "./dto/register-user-dto.js";



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
}