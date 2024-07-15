import { Module } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CompanyRatingModule } from './company-rating/company-rating.module';
import { DatabaseModule } from './database/database.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig],
      // ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: Joi.object({
        PG_HOST: Joi.string().required(),
        PG_PORT: Joi.number().required(),
        PG_USER: Joi.string().required(),
        PG_PASS: Joi.string().required(),
        PG_DB: Joi.string().required(),
      }),
    }),
    CompanyModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('PG_HOST', 'localhost'),
        port: configService.get<number>('PG_PORT', 5432),
        username: configService.get<string>('PG_USER', 'postgres'),
        password: configService.get<string>('PG_PASS'),
        database: configService.get<string>('PG_DB', 'postgres'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    CompanyRatingModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}
