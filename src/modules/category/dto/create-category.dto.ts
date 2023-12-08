import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateCategoryDto {
  @ApiProperty({ description: '名称' })
  @IsNotEmpty()
  readonly name: string;
}
