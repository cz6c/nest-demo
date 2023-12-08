import { Controller, Get, Post, Body, Query, Req } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UserVO,
  UserListVO,
  UserListParamsDto,
} from './dto/index.dto';
import { IdDto } from '@/common/common.dto';
import { Public } from '@/decorator/public-auth.decorator';
import { Request } from 'express';
import { UserDto } from '@/auth/dto/auth.dto';

@ApiTags('用户管理')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @ApiOperation({ summary: '创建' })
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: '列表' })
  @ApiOkResponse({ type: UserListVO })
  @Get('list')
  async findAll(@Query() params: UserListParamsDto) {
    return await this.userService.findAll(params);
  }

  @ApiOperation({ summary: '详情' })
  @ApiOkResponse({ type: UserVO })
  @Get('info')
  async findOne(@Req() req: Request) {
    const user = req.user as UserDto;
    return await this.userService.findOne(user.id);
  }

  @ApiOperation({ summary: '更新' })
  @Post('update')
  async update(@Body() data: UpdateUserDto, @Req() req: Request) {
    return await this.userService.update(data, req.user as UserDto);
  }

  @ApiOperation({ summary: '删除' })
  @Post('delete')
  async remove(@Body() data: IdDto) {
    return await this.userService.remove(data.id);
  }

  @ApiOperation({ summary: '绑定关系' })
  @Get('follow')
  async follow(@Query() params: IdDto, @Req() req: Request) {
    return await this.userService.follow(params.id, req.user as UserDto);
  }
}
