import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import FileEntity from "../entity/file.entity";
import EmbeddingDocumentEntity from "../entity/embedding-document.entity";
import EmbeddingChunkEntity from "../entity/embedding-chunk.entity";
import fs = require("fs/promises");
import {
  cleanText,
  extractText,
  generateEmbedding,
  splitIntoChunks,
} from "../utils/text-processing";
import { v4 as uuidv4 } from "uuid";
import pgvector = require("pgvector");

const fileRepo = AppDataSource.getRepository(FileEntity);
const embeddingDocRepo = AppDataSource.getRepository(EmbeddingDocumentEntity);
const embeddingChunkRepo = AppDataSource.getRepository(EmbeddingChunkEntity);

export class KnowledgeController {
  async addFile(req: Request, res: Response) {
    try {
      const file = await fileRepo.findOne({ where: { id: req.params.fileId } });
      if (!file) {
        return res.status(404).json({ message: "File not found in database" });
      }

      const content = await extractText(file);
      const embeddingDocument = embeddingDocRepo.create({
        id: uuidv4(),
        fileId: file.id,
        metadata: {},
        chunks: [],
      });

      const textChunks = splitIntoChunks(content);
      for (const textChunk of textChunks) {
        const embeddings = await generateEmbedding(textChunk);
        if (
          !Array.isArray(embeddings) ||
          embeddings.includes(null) ||
          embeddings.includes(undefined)
        ) {
          throw new Error(
            `Invalid embedding generated for chunk: ${textChunk}`
          );
        }
        const embeddingChunk = embeddingChunkRepo.create({
          embeddingId: embeddingDocument.id,
          chunkContent: textChunk,
          chunkEmbedding: embeddings[0] as any,
        });
        embeddingDocument.chunks.push(embeddingChunk);
      }

      await embeddingDocRepo.save(embeddingDocument);
      return embeddingDocument;
    } catch (error) {
      console.log(error);
    }
  }
}
