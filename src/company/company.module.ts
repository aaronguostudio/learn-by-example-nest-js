import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entity/company.entity';
import { Tag } from 'src/tag/entity/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Tag])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
