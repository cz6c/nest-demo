import { Entity, Column, ManyToOne } from 'typeorm';
import { CommonEntity } from '@/common/common.entity';
import { QINIU } from '#/index';
import { FollowEntity } from '@/user/entities/follow.entity';

@Entity('map_record')
export class MapRecordEntity extends CommonEntity {
  @Column()
  content: string;

  @Column({ type: 'timestamp', nullable: true })
  eventDate: Date;

  @Column({
    type: 'simple-array',
    nullable: true,
    transformer: {
      to(value) {
        return value.map((c: string) => c.replace(QINIU.DOMAIN, ''));
      },
      from(value) {
        return value.map((c: string) => `${QINIU.DOMAIN}${c}`);
      },
    },
  })
  files: string[];

  @Column()
  lng: string;

  @Column()
  lat: string;

  @Column()
  address: string;

  @ManyToOne(() => FollowEntity, (entity) => entity.mapRecords)
  follow: FollowEntity;
}
