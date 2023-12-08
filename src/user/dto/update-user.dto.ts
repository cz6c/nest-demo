import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional, PartialType, OmitType } from '@nestjs/swagger';
import { Allow } from 'class-validator';

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
