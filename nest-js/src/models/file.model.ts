import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ database: 'postgres', name: 'data' })
export class FileModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'filw_name' })
  fileName: string;

  @Column({ type: 'bytea' })
  data: Uint8Array;

  @Column({ name: 'data_size' })
  dataSize: number;

  @CreateDateColumn({ name: 'create_at_utc', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at_utc', type: 'timestamptz' })
  updatedAt: Date;

  @Column({ name: 'modified_by' })
  modifiedBy: string;
}
