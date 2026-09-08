import { randomUUID } from "node:crypto";
import { extname } from "node:path";
import multer from "multer";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import { uploadsDir } from "../data/paths.js";

const ALLOWED_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/svg+xml"]);
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB: de sobra para un logo o una foto de perfil.

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename(_req, file, callback) {
    const ext = extname(file.originalname).toLowerCase() || guessExt(file.mimetype);
    callback(null, `${randomUUID()}${ext}`);
  },
});

function guessExt(mimetype: string): string {
  switch (mimetype) {
    case "image/png":
      return ".png";
    case "image/webp":
      return ".webp";
    case "image/svg+xml":
      return ".svg";
    default:
      return ".jpg";
  }
}

const singleImage = multer({
  storage,
  limits: { fileSize: MAX_SIZE_BYTES },
  fileFilter(_req, file, callback) {
    if (!ALLOWED_TYPES.has(file.mimetype)) {
      callback(new Error("Formato de imagen no soportado (usá PNG, JPG, WEBP o SVG)."));
      return;
    }
    callback(null, true);
  },
}).single("image");

/**
 * Middleware para un único campo de archivo `image`, con los errores de
 * multer (tamaño, tipo) convertidos en un 400 legible en vez de un 500 genérico.
 */
export const uploadImage: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  singleImage(req, res, (error: unknown) => {
    if (error) {
      res.status(400).json({ ok: false, error: error instanceof Error ? error.message : "No se pudo subir la imagen." });
      return;
    }
    next();
  });
};
