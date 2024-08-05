import { Injectable, Module, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { Company } from './entity/company.entity';
import { Tag } from '../tag/entity/tag.entity';
import { Event } from '../event/entity/event.entity';
import { COMPANY_NAME_LIST, COMPANY_NAMES } from './company.constants';
// import { ConfigModule } from '@nestjs/config';
// import companyConfig from './config/company.config';

// class MockCompanyService {}
// class MockConfigService {}
// class MockDevConfigService {}
// class MockProdConfigService {}

@Injectable()
export class MockCompanyNamesFactory {
  create() {
    return COMPANY_NAME_LIST;
  }
}

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, Tag, Event]),
    // ConfigModule,
    // ConfigModule.forFeature(companyConfig), // partial registration
  ],
  controllers: [CompanyController],
  providers: [
    CompanyService,
    MockCompanyNamesFactory,
    // Custom provider
    {
      provide: COMPANY_NAMES,
      // useValue: COMPANY_NAME_LIST,
      // useFactory: () => COMPANY_NAME_LIST,
      useFactory: (mockCompanyNamesFactor: MockCompanyNamesFactory) =>
        mockCompanyNamesFactor.create(),
      inject: [MockCompanyNamesFactory],
      scope: Scope.DEFAULT,
    },
    // {
    //   provide: MockConfigService,
    //   useClass:
    //     process.env.NODE_ENV === 'development'
    //       ? MockDevConfigService
    //       : MockProdConfigService,
    // },
  ],
  // The commented code below is an alternative way to provide the CompanyService
  // providers: [
  //   {
  //     provide: CompanyService,
  //     // useClass: CompanyService,
  //     useValue: new MockCompanyService(),
  //   },
  //   {
  //     provide: COMPANY_NAMES,
  //     useValue: ['Apple', 'Google', 'Microsoft'],
  //   },
  // ],
  exports: [CompanyService],
})
export class CompanyModule {}
