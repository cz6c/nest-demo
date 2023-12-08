import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { MapEntity } from './entities/map.entity';
import {
  CreateMapDto,
  UpdateMapDto,
  MapVO,
  MapListVO,
  MapListParamsDto,
} from './dto/index.dto';

@Injectable()
export class MapService {
  constructor(
    @InjectRepository(MapEntity)
    private readonly mapRepository: Repository<MapEntity>,
  ) {}

  // 创建
  async create(data: CreateMapDto, followId: number) {
    const { title } = data;
    const item = await this.mapRepository.findOne({
      where: { title, isDelete: false },
    });
    if (item) {
      throw new HttpException(`${title}已存在`, 200);
    }
    const newItem = this.mapRepository.create({
      ...data,
      follow: { id: followId },
    });
    return await this.mapRepository.save(newItem);
  }

  // 列表
  async findAll(query: MapListParamsDto, followId: number): Promise<MapListVO> {
    const { title, page = 1, limit = 10 } = query;
    const where: Record<string, any> = {
      isDelete: false,
      follow: { id: followId },
    };
    if (title) {
      where.title = Like(`%${title}%`);
    }
    const [list, total] = await this.mapRepository.findAndCount({
      relations: ['mapRecords'],
      where,
      order: { updateTime: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { list, page, limit, total };
  }

  // 详情
  async findOne(id: number): Promise<MapVO> {
    const item = await this.mapRepository.findOne({
      relations: ['mapRecords'],
      where: { id, isDelete: false },
    });
    if (!item) {
      throw new HttpException(`id为${id}的数据不存在`, 200);
    }
    return item;
  }

  // 更新
  async update(data: UpdateMapDto) {
    const { id } = data;
    const item = await this.mapRepository.findOne({
      where: { id, isDelete: false },
    });
    const updateItem = this.mapRepository.merge(item, data);
    return this.mapRepository.save(updateItem);
  }

  // 刪除
  async remove(id: number) {
    const item = await this.mapRepository.findOne({
      where: { id, isDelete: false },
    });
    if (!item) {
      throw new HttpException(`id为${id}的数据不存在`, 400);
    }
    // return await this.mapRepository.remove(item);
    item.isDelete = true;
    return this.mapRepository.save(item);
  }
}
