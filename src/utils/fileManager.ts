import multer, { StorageEngine } from "multer";
import fs from "fs";
import path from "path";
import { Request } from "express";

const ensureDirectoryExists = (dir: string) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

const getMulterStorage = (folder: string): StorageEngine => {
    return multer.diskStorage({
        destination: (req: Request, file, cb) => {
            const uploadPath = path.join("uploads", folder);
            ensureDirectoryExists(uploadPath);
            cb(null, uploadPath);
        },
        filename: (req: Request, file, cb) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + path.extname(path.basename(file.originalname)));
        },
    });
};

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only JPEG, PNG, and WEBP files are allowed!"));
    }
};

export const uploadFile = (folder: string) => {
    return multer({
        storage: getMulterStorage(folder),
        fileFilter,
        limits: { fileSize: 2 * 1024 * 1024 },
    }).single("image");
};

export const deleteFile = (filePath: string) => {
    const absolutePath = path.join(__dirname, "../..", filePath);

    if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
    }
};
