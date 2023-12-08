import { IsOptional, IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto, PaginationVO, CommonVO } from '@/common/common.dto';

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
