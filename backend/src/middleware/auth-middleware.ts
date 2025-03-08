import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { User } from "../models/User";

type User = { 
    id: number;
    pk: string;
    address: string;
};

declare global {
    namespace Express {
        interface Request {
            user: User // Custom user property
        }
    }
}

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers["authorization"]?.split("Bearer ")?.[1];
        if (!token) {
            throw new Error("Unauthorized")
        }
        const data = jwt.decode(token);
        if (!data) {
            throw new Error("Unauthorized")
        }
        const userData = data as User;
        const exists = await User.findByPk(userData.id);
        if (!exists) {
            throw new Error("Unauthorized");
        }
        req.user = { 
            id: userData.id,
            pk: userData.pk,
            address: userData.address
        }
        next()
    } catch (error: any) {
        res.status(401).json({ message: error.message })
    }
}