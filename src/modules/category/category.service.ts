import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryVO,
  CategoryListVO,
  CategoryListParamsDto,
} from './dto/index.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  // 创建
  async create(data: CreateCategoryDto) {
    const { name } = data;
    const item = await this.categoryRepository.findOne({
      where: { name, isDelete: false },
    });
    if (item) {
      throw new HttpException(`${name}已存在`, 200);
    }
    const newItem = this.categoryRepository.create(data);
    return await this.categoryRepository.save(newItem);
  }

  // 列表
  async findAll(query: CategoryListParamsDto): Promise<CategoryListVO> {
    const { name, page = 1, limit = 10 } = query;
    const where: Record<string, any> = { isDelete: false };
    if (name) {
      where.name = Like(`%${name}%`);
    }
    const [list, total] = await this.categoryRepository.findAndCount({
      where,
      order: { updateTime: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { list, page, limit, total };
  }

  // 详情
  async findOne(id: number): Promise<CategoryVO> {
    const item = await this.categoryRepository.findOne({
      where: { id, isDelete: false },
    });
    if (!item) {
      throw new HttpException(`id为${id}的数据不存在`, 200);
    }
    return item;
  }

  // 更新
  async update(data: UpdateCategoryDto) {
    const { id } = data;
    const item = await this.categoryRepository.findOne({
      where: { id, isDelete: false },
    });
    if (!item) {
      throw new HttpException(`id为${id}的数据不存在`, 200);
    }
    const updateItem = this.categoryRepository.merge(item, data);
    return this.categoryRepository.save(updateItem);
  }

  // 刪除
  async remove(id: number) {
    const item = await this.categoryRepository.findOne({
      where: { id, isDelete: false },
    });
    if (!item) {
      throw new HttpException(`id为${id}的数据不存在`, 200);
    }
    // return await this.categoryRepository.remove(item);
    item.isDelete = true;
    return this.categoryRepository.save(item);
  }
}
