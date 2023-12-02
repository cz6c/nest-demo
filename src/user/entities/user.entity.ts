import { Entity, Column } from 'typeorm';
import { CommonEntity } from '@/common/common.entity';

@Entity('user')
export class UserEntity extends CommonEntity {
  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  avatar: string;
}
