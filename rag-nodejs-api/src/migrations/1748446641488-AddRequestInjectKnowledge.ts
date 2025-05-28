import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRequestInjectKnowledge1748446641488
  implements MigrationInterface
{
  name = "AddRequestInjectKnowledge1748446641488";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "request_inject_knowledge" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "fileId" uuid NOT NULL,
        "added" BOOLEAN DEFAULT TRUE,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "request_inject_knowledge";`);
  }
}
