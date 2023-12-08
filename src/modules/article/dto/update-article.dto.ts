import { CreateArticleDto } from './create-article.dto';
import { IntersectionType } from '@nestjs/swagger';
import { IdDto } from '@/common/common.dto';

export class UpdateArticleDto extends IntersectionType(
  IdDto,
  CreateArticleDto,
) {}
