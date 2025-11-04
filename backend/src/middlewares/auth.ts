// src/auth/middlewares/auth.ts
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

interface AuthRequest extends Request {
  user?: { id: number; email: string };
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  
  if (!token) {
    return res.status(401).json({ message: "Token ausente" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};