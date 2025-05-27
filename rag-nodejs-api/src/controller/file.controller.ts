import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import FileEntity from "../entity/file.entity";

const fileRepo = AppDataSource.getRepository(FileEntity);

export class FileController {
  // other methods...

  async uploadFile(req: Request, res: Response) {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const file = fileRepo.create({
      fileName: req.file.filename, // saved file name (randomized by multer)
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      url: `/uploads/${req.file.filename}`,
    });

    await fileRepo.save(file);
    return file;
  }

  async getFile(req: Request, res: Response) {
    const file = await fileRepo.findOne({
      where: { id: req.params.fileId },
    });
    if (!file) {
      return res.status(404).json({ message: "File not found in database" });
    }

    return file;
  }
}
