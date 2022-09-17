import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ssl: configService.get('MODE') === 'prod',
        extra: {
          ssl:
            configService.get('MODE') === 'prod'
              ? { rejectUnauthorized: false }
              : null
        },
        type: 'postgres',
        URL: configService.get('DATABASE_URL'),
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
        synchronize: true
      })
    })
  ]
})
export class DatabaseModule {}
