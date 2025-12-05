import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export interface AuthRequest extends Request {
    userId?: string;
  }

export const isAuthed = (req: AuthRequest , res: Response , next : NextFunction)=> {
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(404).json({
                message : "Unauthorized user!",
                success: false
            })
        }
        const decode = jwt.verify(token , process.env.JWT_SECRET!) as JwtPayload
        if(!decode){
            return res.status(404).json({
                message : "Invalid token!",
                success: false
            })
        }
        req.userId = decode.userId
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "Internal server error!" ,
            success: false
        })
    }
}