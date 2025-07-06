import { Request, Response } from "express";
import { Section } from "../models/Section";

export const createSection = async (req: Request, res: Response) => {
  const { courseId, title } = req.body;
  try {
    const section = await Section.create({ course: courseId, title });
    res.status(201).json(section);
  } catch (err) {
    res.status(500).json({ message: "Failed to create section", error: err });
  }
};

export const getCourseSections = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  try {
    const sections = await Section.find({ course: courseId });
    res.json(sections);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sections", error: err });
  }
}; 