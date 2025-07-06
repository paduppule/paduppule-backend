import { Request, Response } from "express";
import { Lesson } from "../models/Lesson";

export const createLesson = async (req: Request, res: Response) => {
  const { sectionId, title, content, videoUrl } = req.body;
  try {
    const lesson = await Lesson.create({ section: sectionId, title, content, videoUrl });
    res.status(201).json(lesson);
  } catch (err) {
    res.status(500).json({ message: "Failed to create lesson", error: err });
  }
};

export const getLessonsBySection = async (req: Request, res: Response) => {
  const { sectionId } = req.params;
  try {
    const lessons = await Lesson.find({ section: sectionId });
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch lessons", error: err });
  }
};

export const uploadAttachments = async (req: Request, res: Response): Promise<void> => {
  const lessonId = req.params.lessonId;
  const files = req.files as Express.Multer.File[];

  const filenames = files.map(f => `/uploads/${f.filename}`);

  const lesson = await Lesson.findById(lessonId);
  if (!lesson) {
    res.status(404).json({ message: "Lesson not found" });
    return;
  }

  lesson.attachments = [...(lesson.attachments || []), ...filenames];
  await lesson.save();

  res.json({ message: "Files uploaded", attachments: lesson.attachments });
  return;
}; 