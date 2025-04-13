import { Module } from '@nestjs/common';
import { AppController } from './adapter/inbounds/app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { URLModel } from './domain/models/url';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { URLController } from './adapter/inbounds/url.controller';
import { UnMinifyURLUseCase } from './applications/usecases/unminifyURL.usecase';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Config } from './utility/constant/config';
import { URLRepositoryToken } from './applications/ports/url.repository';
import { URLPostgresRepository } from './adapter/outbounds/url.repository';
import { MinifyURLUseCase } from './applications/usecases/minifyURL.usecase';
import { RedirectUseCase } from './applications/usecases/redirect.usecase';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_DB_HOST', 'localhost'),
        port: parseInt(configService.get<string>('POSTGRES_DB_PORT', '5432')),
        username: configService.get<string>('POSTGRES_DB_USERNAME', 'postgres'),
        password: configService.get<string>('POSTGRES_DB_PASSWORD', 'postgres'),
        database: configService.get<string>('POSTGRES_DB_DATABASE', 'postgres'),
        entities: [URLModel],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([URLModel]),
  ],
  controllers: [AppController, URLController],
  providers: [
    { provide: APP_PIPE, useClass: ZodValidationPipe },
    AppService,
    MinifyURLUseCase,
    UnMinifyURLUseCase,
    RedirectUseCase,
    {
      provide: URLRepositoryToken,
      useClass: URLPostgresRepository,
    },
    Config,
  ],
})
export class AppModule {}
