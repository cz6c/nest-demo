import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from '@/common/common.entity';
import { ArticleEntity } from '@/modules/article/entities/article.entity';

@Entity('category')
export class CategoryEntity extends CommonEntity {
  @Column()
  name: string;

  @OneToMany(() => ArticleEntity, (article) => article.category)
  articles: ArticleEntity[];
}
