import { CreateUserDto } from './create-user.dto';
import { IdDto } from '@/common/common.dto';
import {
  ApiPropertyOptional,
  IntersectionType,
  PartialType,
  OmitType,
} from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class UpdateUserDto extends IntersectionType(
  IdDto,
  OmitType(PartialType(CreateUserDto), ['username'] as const),
) {
  @ApiPropertyOptional({ description: '头像' })
  @Allow()
  readonly avatar: string;

  @ApiPropertyOptional({ description: '昵称' })
  @Allow()
  readonly nickname: string;
}
