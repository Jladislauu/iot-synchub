// src/auth/controllers/authController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { User } from "../entities/User";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

interface LoginBody {
  email: string;
  password: string;
}

export const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  const { email, password } = req.body;
  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOneBy({ email });
  if (!user || !(await user.checkPassword(password))) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
};