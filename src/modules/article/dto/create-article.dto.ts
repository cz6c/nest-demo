import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateArticleDto {
  @ApiProperty({ description: '标题' })
  @IsNotEmpty()
  readonly title: string;

  @ApiPropertyOptional({ description: '封面图' })
  readonly coverUrl: string;

  @ApiPropertyOptional({ description: '内容' })
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
