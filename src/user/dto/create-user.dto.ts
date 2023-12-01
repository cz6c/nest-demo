import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '请输入用户名' })
  readonly username: string;

  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '请输入密码' })
  readonly password: string;
}
