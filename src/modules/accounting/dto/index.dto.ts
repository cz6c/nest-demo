import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';
import { PaginationDto, PaginationVO, CommonVO } from '@/common/common.dto';
import { IdDto } from '@/common/common.dto';
import { AccountingType } from '@/common/common.enum';

export class CreateAccountingBeforeDto {
  @ApiProperty({ description: '记账名称' })
  @IsString()
  @IsNotEmpty()
  readonly text: string;
}

// 新增
export class CreateAccountingDto {
  @ApiProperty({ description: '记账类型 1为收入、2为支出' })
  @IsEnum(AccountingType)
  readonly type: AccountingType;

  @ApiProperty({ description: '记账名称' })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ description: '记账备注' })
  @IsString()
  readonly remark: string;

  @ApiProperty({ description: '金额' })
  @IsNumber()
  readonly price: number;
}

// 更新
export class UpdateAccountingDto extends IntersectionType(
  IdDto,
  CreateAccountingDto,
) {}

// 详情
export class AccountingVO extends CommonVO {
  @ApiPropertyOptional({ description: '记账类型 1为收入、2为支出' })
  type: AccountingType;

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
