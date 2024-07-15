import { DynamicModule, Module } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

// Static module
// @Module({
//   providers: [
//     {
//       provide: 'CONNECTION',
//       useValue: new DataSource({
//         type: 'postgres',
//         host: 'localhost',
//         port: 5433,
//         username: 'postgres',
//         password: 'password',
//         database: 'postgres',
//       }).initialize(),
//     },
//   ],
// })

// Dynamic module
@Module({})
export class DatabaseModule {
  static register(options: DataSourceOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'CONNECTION',
          useValue: new DataSource(options).initialize(),
        },
      ],
    };
  }
}
