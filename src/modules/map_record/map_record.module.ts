import { Module } from '@nestjs/common';
import { MapRecordService } from './map_record.service';
import { MapRecordController } from './map_record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapRecordEntity } from './entities/map_record.entity';
import { MapEntity } from '@/modules/map/entities/map.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MapRecordEntity, MapEntity])],
  controllers: [MapRecordController],
  providers: [MapRecordService],
})
export class MapRecordModule {}
