import mammoth = require("mammoth");
import FileEntity from "../entity/file.entity";
import fs = require("fs/promises");
import pdfParse from "pdf-parse";
import path = require("path");
import axios from "axios";

export async function extractText(file: FileEntity): Promise<string> {
  const buffer = await fs.readFile(path.join("./", file.url));
  var text;
  switch (file.mimetype) {
    case "application/pdf":
      const pdfData = await pdfParse(buffer);
      text = pdfData.text.trim();
      text = cleanText(text);
      break;

    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      const docxResult = await mammoth.extractRawText({ buffer });
      text = docxResult.value.trim();
      text = cleanText(text);
      break;

    case "text/plain":
      text = cleanText(buffer.toString("utf-8").trim());
      break;

    default:
      throw new Error(`Unsupported MIME type: ${file.mimetype}`);
  }
  return text;
}

export function cleanText(raw: string): string {
  return raw
    .replace(/\r\n|\r/g, "\n") // Normalize Windows/Mac line endings to Unix
    .replace(/\n{2,}/g, "\n\n") // Collapse 2+ newlines to exactly two
    .replace(/[ \t]{2,}/g, " ") // Collapse 2+ spaces/tabs to one space
    .trim(); // Remove leading/trailing whitespace
}

export function splitIntoChunks(text: string, chunkSize = 500): string[] {
  const words = text.split(/\s+/);
  const chunks = [];

  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(" "));
  }

  return chunks;
}

export async function generateEmbedding(input: string): Promise<number[]> {
  try {
    const response = await axios.post("http://localhost:11434/api/embed", {
      model: process.env.LLM_NAME,
      input,
    });
    return response.data.embeddings;
  } catch (error) {
    console.error("Failed to generate embedding:", error);
    throw new Error("Embedding generation failed");
  }
}
