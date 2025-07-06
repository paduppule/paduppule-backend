import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User, IUser } from "../models/user.model";
import { Types } from "mongoose"; // Add this import

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email }) as IUser | null;
    if (existingUser) {
    res.status(400).json({ message: "User already exists" });
    return;
}

    const user = await User.create({ name, email, password, role });
    // Explicitly cast _id to ObjectId and then to string
    const token = generateToken((user._id as Types.ObjectId).toString());
    res.status(201).json({
      message: "Register successful",
      user: { id: (user._id as Types.ObjectId).toString(), name: user.name, email: user.email, role: user.role },
      token
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }) as IUser | null;
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const token = generateToken((user._id as Types.ObjectId).toString());
    res.status(200).json({
      message: "Login successful",
      user: { id: (user._id as Types.ObjectId).toString(), name: user.name, email: user.email, role: user.role },
      token
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};