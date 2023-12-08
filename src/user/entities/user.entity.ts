import { Entity, Column, OneToMany } from 'typeorm';
import { CommonEntity } from '@/common/common.entity';
import { ArticleEntity } from '@/modules/article/entities/article.entity';

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

  @Column({ type: 'timestamp', nullable: true })
  birthday: Date;

  @OneToMany(() => ArticleEntity, (entity) => entity.author)
  articles: ArticleEntity[];
}
