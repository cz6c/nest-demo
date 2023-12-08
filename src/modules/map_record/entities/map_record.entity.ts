import { Entity, Column, ManyToOne } from 'typeorm';
import { CommonEntity } from '@/common/common.entity';
import { MapEntity } from '@/modules/map/entities/map.entity';

@Entity('map_record')
export class MapRecordEntity extends CommonEntity {
  @Column({ type: 'timestamp', nullable: true })
  eventDate: Date;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'simple-array', nullable: true })
  files: string[];

  @ManyToOne(() => MapEntity, (entity) => entity.mapRecords)
  map: MapEntity;
}
