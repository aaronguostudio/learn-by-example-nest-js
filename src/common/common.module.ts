import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { ConfigModule } from '@nestjs/config';
// import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class CommonModule {}
// export class CommonModule implements NestModule {
//   // configure(consumer: MiddlewareConsumer) {
//   //   consumer.apply(LoggingMiddleware).forRoutes('*');
//   //   // consumer.apply(LoggingMiddleware).forRoutes('company');
//   //   // consumer.apply(LoggingMiddleware).forRoutes({
//   //   //   path: 'company',
//   //   //   method: RequestMethod.GET,
//   //   // });
//   //   // consumer.apply(LoggingMiddleware).exclude('company').forRoutes('*');
//   // }
// }
