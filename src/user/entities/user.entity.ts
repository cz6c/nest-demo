import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createTime: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updateTime: Date;

  // 软删除
  @Column({
    default: false,
    select: false,
  })
  isDelete: boolean;
}
