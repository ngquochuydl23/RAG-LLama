import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import EmbeddingChunkEntity from "./embedding-chunk.entity";
import FileEntity from "./file.entity";

@Entity("embedding_documents")
export default class EmbeddingDocumentEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  chunkContent: string;

  @Column("uuid")
  fileId: string;

  @Column("jsonb")
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => EmbeddingChunkEntity, (chunk) => chunk.embeddingDocument, {
    cascade: true,
  })
  chunks: EmbeddingChunkEntity[];

  @OneToOne(() => FileEntity)
  file: FileEntity;
}
