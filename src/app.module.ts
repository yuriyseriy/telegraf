import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/entities/post.entity';
import { VkModule } from './vk/vk.module';

const TELEGRAM_BOT_TOKEN = '5092876698:AAHQiRrcHXrrdQravLoQ1C4x8polBgX_OjM';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TelegrafModule.forRoot({
      token: TELEGRAM_BOT_TOKEN,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const IS_SSL = configService.get('IS_SSL');
        console.log(configService.get('DATABASE_URL'));
        return {
          type: 'postgres',
          url: configService.get('DATABASE_URL'),
          entities: [Post],
          synchronize: true,
          logging: true,
          ssl: IS_SSL ? { rejectUnauthorized: false } : null,
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
