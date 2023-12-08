import { IsOptional, IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto, PaginationVO, CommonVO } from '@/common/common.dto';
import { TagVO } from '@/modules/tag/dto/index.dto';

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
