import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmbeddingDocumentChunkEntity1748363709585
  implements MigrationInterface
{
  name = "AddEmbeddingDocumentChunkEntity1748363709585";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "embedding_chunks" (
            "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            "embeddingId" uuid NOT NULL,
            "chunkContent" text NOT NULL,
            "chunkEmbedding" vector(4096) NOT NULL,
            "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
            "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
            CONSTRAINT "fk_embedding_id" FOREIGN KEY ("embeddingId") REFERENCES "embedding_documents" ("id") ON DELETE CASCADE
        );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "embedding_chunks"`);
  }
}
