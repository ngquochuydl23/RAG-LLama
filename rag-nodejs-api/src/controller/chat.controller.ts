import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import FileEntity from "../entity/file.entity";
import EmbeddingDocumentEntity from "../entity/embedding-document.entity";
import EmbeddingChunkEntity from "../entity/embedding-chunk.entity";
import { generateEmbedding } from "../utils/text-processing";

const fileRepo = AppDataSource.getRepository(FileEntity);
const embeddingDocumentRepo = AppDataSource.getRepository(
  EmbeddingDocumentEntity
);

const embeddingChunkRepo = AppDataSource.getRepository(EmbeddingChunkEntity);

export class ChatController {
  async completions(req: Request, res: Response) {
    const file = await fileRepo.findOne({ where: { id: req.body.fileId } });
    if (!file) {
      return res.status(404).json({ message: "File not found in database" });
    }

    const embeddingDoc = await embeddingDocumentRepo.findOne({
      where: { id: req.params.fileId },
      order: {
        createdAt: "DESC",
      },
    });

    if (!embeddingDoc) {
      return res.status(404).json({ message: "embeddingDoc null" });
    }

    const queryEmbedding = await generateEmbedding(req.body.prompt);
    const chunks = await embeddingChunkRepo.find({
      where: { embeddingId: embeddingDoc.id },
    });

    const scoredChunks = chunks
      .map((chunk) => {
        let chunkVec: number[] = [];

        try {
          chunkVec =
            typeof chunk.chunkEmbedding === "string"
              ? JSON.parse(chunk.chunkEmbedding)
              : chunk.chunkEmbedding;
        } catch (e) {
          console.error("Error parsing chunk vector:", chunk.chunkEmbedding);
          return null;
        }

        // Skip if dimensions don't match
        if (!chunkVec || chunkVec.length !== queryEmbedding.length) return null;

        const score = this.cosineSimilarity(queryEmbedding, chunkVec);
        return { chunk, score };
      })
      .filter(Boolean); // remove nulls

    console.log(scoredChunks);
    return file;
  }

  cosineSimilarity(a: any, b: number[]): number {
    const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    if (magA === 0 || magB === 0) return 0;
    return dot / (magA * magB);
  }
}
