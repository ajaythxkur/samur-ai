import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export default function validationMiddleware(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if(error instanceof ZodError){
                const errorMessages = error.errors.map((issue: any)=>(`${issue.path.join('.')} is ${issue.message}`));
                res.status(400).json({ data: errorMessages[0] })
            } else {
                res.status(500).json({ data: "Internal server error" });
            }
        }
    }
}