import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { CommonEntity } from '@/common/common.entity';
import { FollowEntity } from '@/user/entities/follow.entity';
import { MapRecordEntity } from '@/modules/map_record/entities/map_record.entity';

@Entity('map')
export class MapEntity extends CommonEntity {
  @Column()
  title: string;

  @Column()
  lng: string;

  @Column()
  lat: string;

  @Column()
  address: string;

  @ManyToOne(() => FollowEntity, (entity) => entity.maps)
  follow: FollowEntity;

  @OneToMany(() => MapRecordEntity, (entity) => entity.map)
  mapRecords: MapRecordEntity[];
}
