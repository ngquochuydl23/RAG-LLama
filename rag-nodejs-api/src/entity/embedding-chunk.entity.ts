import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
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

  @Column("float8", { array: true })
  chunkEmbedding: number[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => EmbeddingDocumentEntity, (doc) => doc.chunks, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "embeddingId" })
  embeddingDocument: EmbeddingDocumentEntity;
}
