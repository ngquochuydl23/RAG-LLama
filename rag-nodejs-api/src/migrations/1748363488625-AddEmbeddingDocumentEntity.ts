import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmbeddingDocumentEntity1748363488625
  implements MigrationInterface
{
  name = "AddEmbeddingDocumentEntity1748363488625";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "vector"`);

    await queryRunner.query(`
      CREATE TABLE "files" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "fileName" character varying NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        "udpatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        CONSTRAINT "PK_files_id" PRIMARY KEY ("id")
      );
    `);

    await queryRunner.query(`CREATE TABLE "embedding_documents" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "content" character varying NOT NULL, 
            "fileId" uuid NOT NULL,
            "metadata" jsonb NOT NULL, 
            "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
            "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
            CONSTRAINT "PK_0c1ab4f3a0a0ec2e16cdc703826" PRIMARY KEY ("id"),
            CONSTRAINT "fk_file_id" FOREIGN KEY ("fileId") REFERENCES "files" ("id") ON DELETE CASCADE
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "embedding_documents"`);
    await queryRunner.query(`DROP TABLE "files";`);
  }
}
