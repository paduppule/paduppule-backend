import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const fileUpload = multer({
  storage,
  fileFilter: (_, file, cb) => {
    const ext = path.extname(file.originalname);
    if (![".pdf", ".docx", ".zip", ".pptx"].includes(ext)) {
      return cb(new Error("Unsupported file type"));
    }
    cb(null, true);
  }
});
