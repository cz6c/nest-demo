import { IsOptional, IsNotEmpty } from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';
import { PaginationDto, PaginationVO, CommonVO } from '@/common/common.dto';
import { IdDto } from '@/common/common.dto';
import { MapRecordEntity } from '@/modules/map_record/entities/map_record.entity';

// 新增
export class CreateMapDto {
  @ApiProperty({ description: '标题' })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ description: '经度' })
  @IsNotEmpty()
  readonly lng: string;

  @ApiProperty({ description: '纬度' })
  @IsNotEmpty()
  readonly lat: string;

  @ApiProperty({ description: '地址' })
  @IsNotEmpty()
  readonly address: string;
}

// 更新
export class UpdateMapDto extends IntersectionType(IdDto, CreateMapDto) {}

// 详情
export class MapVO extends CommonVO {
  @ApiPropertyOptional({ description: '标题' })
  readonly title: string;

  @ApiPropertyOptional({ description: '经度' })
  readonly lng: string;

  @ApiPropertyOptional({ description: '纬度' })
  readonly lat: string;

  @ApiPropertyOptional({ description: '地址' })
  readonly address: string;

  @ApiPropertyOptional({ type: [MapRecordEntity], description: '足迹' })
  mapRecords: MapRecordEntity[];
}

// 列表
export class MapListVO extends PaginationVO {
  @ApiPropertyOptional({ type: [MapVO], description: '列表' })
  readonly list: MapVO[];
}

// 列表查询
export class MapListParamsDto extends PaginationDto {
  @ApiPropertyOptional({ description: '标题' })
  @IsOptional()
  @IsNotEmpty()
  readonly title: string;
}
