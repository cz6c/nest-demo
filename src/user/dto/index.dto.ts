import { IsOptional, IsNotEmpty, Allow } from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { PaginationDto, PaginationVO, CommonVO } from '@/common/common.dto';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty()
  readonly password: string;
}

export class UpdateUserDto extends OmitType(PartialType(CreateUserDto), [
  'username',
] as const) {
  @ApiPropertyOptional({ description: '头像' })
  @Allow()
  readonly avatar: string;

  @ApiPropertyOptional({ description: '昵称' })
  @Allow()
  readonly nickname: string;

  @ApiPropertyOptional({ description: '生日' })
  @Allow()
  readonly birthday: string;
}

export class UserVO extends CommonVO {
  @ApiPropertyOptional({ description: '账号' })
  readonly username: string;

  @ApiPropertyOptional({ description: '昵称' })
  readonly nickname: string;
}

// 列表
export class UserListVO extends PaginationVO {
  @ApiPropertyOptional({ type: [UserVO], description: '列表' })
  readonly list: UserVO[];
}

// 列表查询
export class UserListParamsDto extends PaginationDto {
  @ApiPropertyOptional({ description: '昵称' })
  @IsOptional()
  @IsNotEmpty()
  readonly nickname: string;
}
