import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { AccountingEntity } from './entities/accounting.entity';
import {
  CreateAccountingDto,
  UpdateAccountingDto,
  AccountingVO,
  AccountingListVO,
  AccountingListParamsDto,
} from './dto/index.dto';

@Injectable()
export class AccountingService {
  constructor(
    @InjectRepository(AccountingEntity)
    private readonly memorialDayRepository: Repository<AccountingEntity>,
  ) {}

  // 创建
  async create(data: CreateAccountingDto) {
    const newItem = this.memorialDayRepository.create({ ...data });
    return await this.memorialDayRepository.save(newItem);
  }

  // 列表
  async findAll(
    query: AccountingListParamsDto,
    followId: number,
  ): Promise<AccountingListVO> {
    const { title, page, limit } = query;
    const where: Record<string, any> = {
      isDelete: false,
      follow: { id: followId },
    };
    if (title) {
      where.title = Like(`%${title}%`);
    }
    const skip = (page && limit && (page - 1) * limit) ?? 0;
    const take = limit ?? 0;
    const [list, total] = await this.memorialDayRepository.findAndCount({
      where,
      order: { createTime: 'DESC' },
      skip,
      take,
    });
    return { list, page, limit, total };
  }

  // 详情
  async findOne(id: number): Promise<AccountingVO> {
    const item = await this.memorialDayRepository.findOne({
      where: { id, isDelete: false },
    });
    if (!item) {
      throw new HttpException(`id为${id}的数据不存在`, 200);
    }
    return item;
  }

  // 更新
  async update(data: UpdateAccountingDto) {
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
