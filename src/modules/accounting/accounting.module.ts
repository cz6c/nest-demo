import { Module } from '@nestjs/common';
import { AccountingService } from './accounting.service';
import { AccountingController } from './accounting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountingEntity } from './entities/accounting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountingEntity])],
  controllers: [AccountingController],
  providers: [AccountingService],
})
export class AccountingModule {}
