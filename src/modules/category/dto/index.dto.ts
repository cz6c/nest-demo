import { IsOptional, IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto, PaginationVO, CommonVO } from '@/common/common.dto';

export class CategoryVO extends CommonVO {
  @ApiPropertyOptional({ description: '名称' })
  readonly name: string;
}

// 列表
export class CategoryListVO extends PaginationVO {
  @ApiPropertyOptional({ type: [CategoryVO], description: '列表' })
  readonly list: CategoryVO[];
}

// 列表查询
export class CategoryListParamsDto extends PaginationDto {
  @ApiPropertyOptional({ description: '名称' })
  @IsOptional()
  @IsNotEmpty()
  readonly name: string;
}
