import { Module } from '@nestjs/common';
import { MapService } from './map.service';
import { MapController } from './map.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapEntity } from './entities/map.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MapEntity])],
  controllers: [MapController],
  providers: [MapService],
})
export class MapModule {}
