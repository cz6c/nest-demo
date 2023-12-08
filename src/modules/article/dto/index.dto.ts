import {
  IsOptional,
  IsNotEmpty,
  IsArray,
  IsNumber,
  Allow,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';
import { PaginationDto, PaginationVO, CommonVO } from '@/common/common.dto';
import { TagVO } from '@/modules/tag/dto/index.dto';
import { IdDto } from '@/common/common.dto';

export class CreateArticleDto {
  @ApiProperty({ description: '标题' })
  @IsNotEmpty()
  readonly title: string;

  @ApiPropertyOptional({ description: '封面图' })
  @Allow()
  readonly coverUrl: string;

  @ApiPropertyOptional({ description: '内容' })
  @Allow()
  readonly htmlContent: string;

  @ApiProperty({ description: '分类id' })
  @IsNotEmpty()
  @IsNumber()
  readonly categoryId: number;

  @ApiProperty({ type: [Number], description: '标签ids' })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly tagIds: number[];
}

export class UpdateArticleDto extends IntersectionType(
  IdDto,
  CreateArticleDto,
) {}

export class ArticleVO extends CommonVO {
  @ApiPropertyOptional({ description: '标题' })
  readonly title: string;

  @ApiPropertyOptional({ description: '封面图' })
  readonly coverUrl: string;

  @ApiPropertyOptional({ description: '内容' })
  readonly htmlContent: string;

  @ApiPropertyOptional({ type: [TagVO], description: '标签数组' })
  tags: TagVO[];

  @ApiPropertyOptional({ description: '分类id' })
  categoryId: number;

  @ApiPropertyOptional({ description: '分类名称' })
  categoryName: string;

  @ApiPropertyOptional({ description: '作者id' })
  authorId: number;

  @ApiPropertyOptional({ description: '作者名称' })
  authorName: string;
}

// 列表
export class ArticleListVO extends PaginationVO {
  @ApiPropertyOptional({ type: [ArticleVO], description: '列表' })
  readonly list: ArticleVO[];
}

// 列表查询
export class ArticleListParamsDto extends PaginationDto {
  @ApiPropertyOptional({ description: '标题' })
  @IsOptional()
  @IsNotEmpty()
  readonly title: string;
}
