import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { CommonEntity } from '@/common/common.entity';
import { FollowEntity } from '@/user/entities/follow.entity';
import { MapRecordEntity } from '@/modules/map_record/entities/map_record.entity';

@Entity('map')
export class MapEntity extends CommonEntity {
  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  lng: string;

  @Column({ nullable: true })
  lat: string;

  @Column({ nullable: true })
  address: string;

  @ManyToOne(() => FollowEntity, (entity) => entity.maps)
  follow: FollowEntity;

  @OneToMany(() => MapRecordEntity, (entity) => entity.map)
  mapRecords: MapRecordEntity[];
}
