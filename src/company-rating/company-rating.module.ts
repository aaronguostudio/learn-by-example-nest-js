import { Module } from '@nestjs/common';
import { CompanyRatingService } from './company-rating.service';
import { CompanyModule } from '../company/company.module';
// import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    // DatabaseModule.register({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5433,
    //   username: 'postgres',
    //   password: 'password',
    //   database: 'postgres',
    // }),
    CompanyModule,
  ],
  providers: [CompanyRatingService],
})
export class CompanyRatingModule {}
