import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { VkModule } from './vk/vk.module';

const TELEGRAM_BOT_TOKEN = '5092876698:AAHQiRrcHXrrdQravLoQ1C4x8polBgX_OjM';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    /*
    TelegrafModule.forRoot({
      // todo rewrite forRootAsync
      token: TELEGRAM_BOT_TOKEN,
    }),
    */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const IS_SSL = configService.get('IS_SSL');
        const url = configService.get('DATABASE_URL');

        console.log(url);

        return {
          type: 'postgres',
          url,
          synchronize: true,
          logging: true,
          autoLoadEntities: true,
          ssl: IS_SSL ? { rejectUnauthorized: false } : null,
          migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
          cli: {
            migrationsDir: './shared/infra/typeorm/migrations',
          },
        };
      },
      inject: [ConfigService],
    }),
    PostsModule,
    VkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
