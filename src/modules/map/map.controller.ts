import { Controller, Get, Post, Body, Query, Req } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { MapService } from './map.service';
import {
  CreateMapDto,
  UpdateMapDto,
  MapVO,
  MapListVO,
  MapListParamsDto,
} from './dto/index.dto';
import { IdDto } from '@/common/common.dto';
import { Request } from 'express';
import { UserDto } from '@/auth/dto/auth.dto';

@ApiTags('地图管理')
@ApiBearerAuth()
@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @ApiOperation({ summary: '创建' })
  @Post('create')
  create(@Body() createUserDto: CreateMapDto, @Req() req: Request) {
    const { followId } = req.user as UserDto;
    return this.mapService.create(createUserDto, followId);
  }

  @ApiOperation({ summary: '列表' })
  @ApiOkResponse({ type: MapListVO })
  @Get('list')
  async findAll(@Query() params: MapListParamsDto, @Req() req: Request) {
    const { followId } = req.user as UserDto;
    return await this.mapService.findAll(params, followId);
  }

  @ApiOperation({ summary: '详情' })
  @ApiOkResponse({ type: MapVO })
  @Get('info')
  async findOne(@Query() params: IdDto) {
    return await this.mapService.findOne(params.id);
  }

  @ApiOperation({ summary: '更新' })
  @Post('update')
  async update(@Body() data: UpdateMapDto) {
    return await this.mapService.update(data);
  }

  @ApiOperation({ summary: '删除' })
  @Post('delete')
  async remove(@Body() data: IdDto) {
    return await this.mapService.remove(data.id);
  }
}
