import { Entity, Column, OneToMany } from 'typeorm';
import { CommonEntity } from '@/common/common.entity';
import { MapEntity } from '@/modules/map/entities/map.entity';
import { MemorialDayEntity } from '@/modules/memorial_day/entities/memorial_day.entity';
import { UserEntity } from './user.entity';

@Entity('follow')
export class FollowEntity extends CommonEntity {
  @Column({ nullable: true })
  homeUrl: string;

  @OneToMany(() => MapEntity, (entity) => entity.follow)
  maps: MapEntity[];

  @OneToMany(() => MemorialDayEntity, (entity) => entity.follow)
  memorialDays: MemorialDayEntity[];

  @OneToMany(() => UserEntity, (entity) => entity.follow)
  users: UserEntity[];
}
