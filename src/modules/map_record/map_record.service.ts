import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MapRecordEntity } from './entities/map_record.entity';
import {
  CreateMapRecordDto,
  UpdateMapRecordDto,
  MapRecordVO,
  MapRecordAllVO,
} from './dto/index.dto';
import { MapEntity } from '@/modules/map/entities/map.entity';

@Injectable()
export class MapRecordService {
  constructor(
    @InjectRepository(MapRecordEntity)
    private readonly memorialDayRepository: Repository<MapRecordEntity>,
    @InjectRepository(MapEntity)
    private readonly mapRepository: Repository<MapEntity>,
  ) {}

  // 创建
  async create(data: CreateMapRecordDto) {
    const { mapId } = data;
    const item = await this.mapRepository.findOne({
      where: { id: mapId, isDelete: false },
    });
    if (!item) {
      throw new HttpException(`mapId为${mapId}的数据不存在`, 200);
    }
    const newItem = this.memorialDayRepository.create({
      ...data,
      map: { id: mapId },
    });
    return await this.memorialDayRepository.save(newItem);
  }

  // 列表
  async getAll(mapId: number): Promise<MapRecordAllVO> {
    const where: Record<string, any> = {
      isDelete: false,
      map: { id: mapId },
    };
    const list = await this.memorialDayRepository.find({
      where,
      order: { updateTime: 'DESC' },
    });
    return { list };
  }

  // 详情
  async findOne(id: number): Promise<MapRecordVO> {
    const item = await this.memorialDayRepository.findOne({
      where: { id, isDelete: false },
    });
    if (!item) {
      throw new HttpException(`id为${id}的数据不存在`, 200);
    }
    return item;
  }

  // 更新
  async update(data: UpdateMapRecordDto) {
    const { id } = data;
    const item = await this.memorialDayRepository.findOne({
      where: { id, isDelete: false },
    });
    const updateItem = this.memorialDayRepository.merge(item, data);
    return this.memorialDayRepository.save(updateItem);
  }

  // 刪除
  async remove(id: number) {
    const item = await this.memorialDayRepository.findOne({
      where: { id, isDelete: false },
    });
    if (!item) {
      throw new HttpException(`id为${id}的数据不存在`, 400);
    }
    // return await this.memorialDayRepository.remove(item);
    item.isDelete = true;
    return this.memorialDayRepository.save(item);
  }
}
