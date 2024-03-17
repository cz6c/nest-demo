import { IsOptional, IsString, IsNotEmpty, IsNumber } from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';
import { PaginationDto, PaginationVO, CommonVO } from '@/common/common.dto';
import { IdDto } from '@/common/common.dto';

// 新增
export class CreateAccountingDto {
  @ApiProperty({ description: '记账类型' })
  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @ApiProperty({ description: '记账名称' })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ description: '金额' })
  @IsNumber()
  readonly price: number;

  @ApiProperty({ description: '记账备注' })
  @IsString()
  @IsOptional()
  readonly remark?: string;
}

// 更新
export class UpdateAccountingDto extends IntersectionType(
  IdDto,
  CreateAccountingDto,
) {}

// 详情
export class AccountingVO extends CommonVO {
  @ApiPropertyOptional({ description: '记账类型' })
  type: string;

  @ApiPropertyOptional({ description: '记账名称' })
  readonly title: string;

  @ApiPropertyOptional({ description: '记账备注' })
  readonly remark: string;

  @ApiPropertyOptional({ description: '金额' })
  readonly price: number;
}

// 列表
export class AccountingListVO extends PaginationVO {
  @ApiPropertyOptional({ type: [AccountingVO], description: '列表' })
  readonly list: AccountingVO[];
}

// 列表查询
export class AccountingListParamsDto extends PaginationDto {
  @ApiPropertyOptional({ description: '标题' })
  @IsOptional()
  @IsString()
  readonly title: string;
}
