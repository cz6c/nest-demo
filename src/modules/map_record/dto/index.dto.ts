import { Allow, IsNotEmpty, IsPositive } from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
  OmitType,
} from '@nestjs/swagger';
import { CommonVO } from '@/common/common.dto';
import { IdDto } from '@/common/common.dto';

// 新增
export class CreateMapRecordDto {
  @ApiProperty({ description: 'mapId' })
  @IsNotEmpty()
  @IsPositive()
  readonly mapId: number;

  @ApiPropertyOptional({ description: '描述' })
  @Allow()
  readonly description: string;

  @ApiProperty({ description: '日期' })
  @IsNotEmpty()
  readonly eventDate: string;

  @ApiProperty({ description: '图片数组' })
  @IsNotEmpty()
  readonly files: string;
}

// 更新
export class UpdateMapRecordDto extends IntersectionType(
  IdDto,
  OmitType(CreateMapRecordDto, ['mapId'] as const),
) {}

// 详情
export class MapRecordVO extends CommonVO {
  @ApiPropertyOptional({ description: '描述' })
  readonly description: string;

  @ApiPropertyOptional({ description: '日期' })
  readonly eventDate: string;

  @ApiPropertyOptional({ description: '图片数组' })
  readonly files: string;
}
