import { Entity, Column, OneToMany } from 'typeorm';
import { CommonEntity } from '@/common/common.entity';
import { MapEntity } from '@/modules/map/entities/map.entity';
import { MemorialDayEntity } from '@/modules/memorial_day/entities/memorial_day.entity';

@Entity('follow')
export class FollowEntity extends CommonEntity {
  @Column()
  fromUserId: number;

  @Column()
  toUserId: number;

  @OneToMany(() => MapEntity, (entity) => entity.follow)
  maps: MapEntity[];

  @OneToMany(() => MemorialDayEntity, (entity) => entity.follow)
  memorialDays: MemorialDayEntity[];
}
