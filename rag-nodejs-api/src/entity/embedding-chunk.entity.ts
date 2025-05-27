import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import EmbeddingDocumentEntity from "./embedding-document.entity";

@Entity("embedding_chunks")
export default class EmbeddingChunkEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  embeddingId: string;

  @Column()
  chunkContent: string;

  @Column()
  chunkEmbedding: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => EmbeddingDocumentEntity, (doc) => doc.chunks, {
    onDelete: "CASCADE",
  })
  embeddingDocument: EmbeddingDocumentEntity;
}
