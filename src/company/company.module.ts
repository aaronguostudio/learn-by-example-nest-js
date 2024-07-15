import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { Company } from './entity/company.entity';
import { Tag } from '../tag/entity/tag.entity';
import { Event } from '../event/entity/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Tag, Event])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
