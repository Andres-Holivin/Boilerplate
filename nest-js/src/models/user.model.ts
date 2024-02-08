import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity({ database: 'postgres', name: 'user' })
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  email: string | null;

  @Column({ nullable: true })
  gender: string;

  @Index('idx_phone')
  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'text', nullable: true })
  address: string | null;

  @Column({ default: 'user' })
  role_name: string;

  @Column({ type: 'text', nullable: true })
  image_profile_id: string | null;

  @CreateDateColumn({ name: 'create_at_utc', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at_utc', type: 'timestamptz' })
  updatedAt: Date;

  @Column({ name: 'modified_by' })
  modifiedBy: string;
}
export interface IUserOtpModel {
  user_id: string;
  user_name: string;
  otp_id: string;
  otp_user_id: string;
  otp_code_otp: string;
  otp_create_at_utc: Date;
  otp_update_at_utc: Date;
  otp_modified_by: string;
}
