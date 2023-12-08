import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import {
  CreateUserDto,
  UpdateUserDto,
  UserVO,
  UserListVO,
  UserListParamsDto,
} from './dto/index.dto';
import { FollowEntity } from './entities/follow.entity';
import { UserDto } from '@/auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,
  ) {}

  // 创建
  async create(data: CreateUserDto) {
    const { username } = data;
    const item = await this.userRepository.findOne({
      where: { username, isDelete: false },
    });
    if (item) {
      throw new HttpException(`${username}已存在`, 200);
    }
    const newItem = this.userRepository.create(data);
    return await this.userRepository.save(newItem);
  }

  // 列表
  async findAll(query: UserListParamsDto): Promise<UserListVO> {
    const { nickname, page = 1, limit = 10 } = query;
    const where: Record<string, any> = { isDelete: false };
    if (nickname) {
      where.nickname = Like(`%${nickname}%`);
    }
    const [list, total] = await this.userRepository.findAndCount({
      where,
      order: { updateTime: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { list, page, limit, total };
  }

  // 详情
  async findOne(id: number): Promise<UserVO> {
    const item = await this.userRepository.findOne({
      where: { id, isDelete: false },
    });
    if (!item) {
      throw new HttpException(`id为${id}的数据不存在`, 200);
    }
    return item;
  }

  // 更新
  async update(data: UpdateUserDto, user: UserDto) {
    const { id } = user;
    const item = await this.userRepository.findOne({
      where: { id, isDelete: false },
    });
    const updateItem = this.userRepository.merge(item, data);
    return this.userRepository.save(updateItem);
  }

  // 刪除
  async remove(id: number) {
    const item = await this.userRepository.findOne({
      where: { id, isDelete: false },
    });
    if (!item) {
      throw new HttpException(`id为${id}的数据不存在`, 400);
    }
    // return await this.userRepository.remove(item);
    item.isDelete = true;
    return this.userRepository.save(item);
  }

  // 通过账号查询密码
  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username, isDelete: false },
      select: ['password', 'username', 'id'],
    });
    if (!user) {
      throw new HttpException('用户名不正确！', 400);
    }
    const follow = await this.followRepository.findOne({
      where: [
        { fromUserId: user.id, isDelete: false },
        { toUserId: user.id, isDelete: false },
      ],
    });
    return { ...user, followId: follow.id ?? 0 };
  }

  // 绑定关系
  async follow(id: number, user: UserDto) {
    if (user.followId) {
      throw new HttpException(`你已存在绑定关系`, 200);
    }
    if (id === user.id) {
      throw new HttpException(`不能绑定自己`, 200);
    }
    const toUser = await this.userRepository.findOne({
      where: { id, isDelete: false },
    });
    if (!toUser) {
      throw new HttpException(`id为${id}的数据不存在`, 200);
    }
    const item = await this.followRepository.findOne({
      where: [
        { fromUserId: id, isDelete: false },
        { toUserId: id, isDelete: false },
      ],
    });
    if (item) {
      throw new HttpException(`该用户已存在绑定关系`, 200);
    }
    const newItem = this.followRepository.create({
      fromUserId: user.id,
      toUserId: id,
    });
    return await this.followRepository.save(newItem);
  }
}
