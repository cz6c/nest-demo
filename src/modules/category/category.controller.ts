import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  CategoryVO,
  CategoryListVO,
  CategoryListParamsDto,
} from './dto/index.dto';
import { IdDto } from '@/common/common.dto';

@ApiTags('文章分类管理')
@ApiBearerAuth()
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: '创建' })
  @Post('create')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({ summary: '列表' })
  @ApiOkResponse({ type: CategoryListVO })
  @Get('list')
  async findAll(@Query() params: CategoryListParamsDto) {
    return await this.categoryService.findAll(params);
  }

  @ApiOperation({ summary: '详情' })
  @ApiOkResponse({ type: CategoryVO })
  @Get('info')
  async findOne(@Query() params: IdDto) {
    return await this.categoryService.findOne(params.id);
  }

  @ApiOperation({ summary: '更新' })
  @Post('update')
  async update(@Body() data: UpdateCategoryDto) {
    return await this.categoryService.update(data);
  }

  @ApiOperation({ summary: '删除' })
  @Post('delete')
  async remove(@Body() data: IdDto) {
    return await this.categoryService.remove(data.id);
  }
}
