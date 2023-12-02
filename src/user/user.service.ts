import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserVO, UserListVO, UserListParamsDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // 创建
  async create(data: CreateUserDto) {
    const { username } = data;
    const item = await this.userRepository.findOne({ where: { username } });
    if (item) {
      throw new HttpException(`${username}已存在`, 401);
    }
    const newItem = await this.userRepository.create(data);
    return await this.userRepository.save(newItem);
  }

  // 列表
  async findAll(query: UserListParamsDto): Promise<UserListVO> {
    const qb = this.userRepository.createQueryBuilder('user');
    qb.where('user.nickname = :nickname', { nickname: query.nickname });
    qb.orderBy('user.createTime', 'DESC');

    const total = await qb.getCount();
    const { page = 1, limit = 10 } = query;
    qb.limit(limit);
    qb.offset(limit * (page - 1));

    const list = await qb.getMany();
    return { list, page, limit, total };
  }

  // 详情
  async findOne(id: number): Promise<UserVO> {
    const item = await this.userRepository.findOne({ where: { id } });
    if (!item) {
      throw new HttpException(`id为${id}的数据不存在`, 401);
    }
    return item;
  }

  // 更新
  async update(data: UpdateUserDto) {
    const { id } = data;
    const item = await this.userRepository.findOne({ where: { id } });
    if (!item) {
      throw new HttpException(`id为${id}的数据不存在`, 401);
    }
    const updateItem = this.userRepository.merge(item, data);
    return this.userRepository.save(updateItem);
  }

  // 刪除
  async remove(id: number) {
    const item = await this.userRepository.findOne({ where: { id } });
    if (!item) {
      throw new HttpException(`id为${id}的数据不存在`, 400);
    }
    // return await this.userRepository.remove(item);
    item.isDelete = true;
    return this.userRepository.save(item);
  }
}
