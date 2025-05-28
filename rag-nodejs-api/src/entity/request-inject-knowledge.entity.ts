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

@Entity("request_inject_knowledge")
export default class RequestInjectKnowledgeEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  fileId: string;

  @Column({ type: Boolean, default: false })
  added: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
