import { IsOptional, IsNotEmpty } from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';
import { PaginationDto, PaginationVO, CommonVO } from '@/common/common.dto';
import { IdDto } from '@/common/common.dto';

// 新增
export class CreateMemorialDayDto {
  @ApiProperty({ description: '标题' })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ description: '日期' })
  @IsNotEmpty()
  readonly eventDate: string;
}

// 更新
export class UpdateMemorialDayDto extends IntersectionType(
  IdDto,
  CreateMemorialDayDto,
) {}

// 详情
export class MemorialDayVO extends CommonVO {
  @ApiPropertyOptional({ description: '标题' })
  readonly title: string;

  @ApiPropertyOptional({ description: '经度' })
  readonly eventDate: string;
}

// 列表
export class MemorialDayListVO extends PaginationVO {
  @ApiPropertyOptional({ type: [MemorialDayVO], description: '列表' })
  readonly list: MemorialDayVO[];
}

// 列表查询
export class MemorialDayListParamsDto extends PaginationDto {
  @ApiPropertyOptional({ description: '标题' })
  @IsOptional()
  @IsNotEmpty()
  readonly title: string;
}
