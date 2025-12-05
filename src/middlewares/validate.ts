import type { NextFunction, Request, Response } from "express";
import type { ZodError, ZodSchema, ZodIssue } from "zod";

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        const error: ZodError = result.error;
        const errors = error.issues.map((err: ZodIssue) => ({
            path: err.path.join("."),
            message: err.message,
        }));

        return res.status(400).json({
            success: false,
            errors,
        });
    }
    req.body = result.data;
    next();
};