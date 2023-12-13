import { IsArray, IsDate, IsInt, IsPositive, IsString } from 'class-validator';
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
  @IsPositive()
  @IsInt()
  readonly mapId: number;

  @ApiPropertyOptional({ description: '描述' })
  @IsString()
  readonly description: string;

  @ApiProperty({ description: '日期' })
  @IsDate()
  readonly eventDate: Date;

  @ApiProperty({ description: '图片数组' })
  @IsArray()
  @IsString({ each: true })
  readonly files: string[];
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
  readonly eventDate: Date;

  @ApiPropertyOptional({ description: '图片数组' })
  readonly files: string[];
}

// 列表
export class MapRecordAllVO {
  @ApiPropertyOptional({ type: [MapRecordVO], description: '列表' })
  readonly list: MapRecordVO[];
}
