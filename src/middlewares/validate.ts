import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

export const validate = (schema : ZodSchema) => (req: Request , res: Response , next: NextFunction) => {
    const result = schema.safeParse(req.body)

    if(!result.success){
        res.status(400).json({
            success: false ,
            message: result.error.errors[0].message 
        })
    }
    req.body = result.data; 
    next();
}