import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsSubscriber } from './posts.subscriber';
import { Post } from './entities/post.entity';
import { VkModule } from '../vk/vk.module';
import { VkService } from '../vk/vk.service';
import { ConfigService } from '@nestjs/config';
import { PostsSchedule } from './posts.schedule';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), VkModule],
  controllers: [PostsController],
  providers: [
    PostsService,
    PostsSubscriber,
    PostsSchedule,
    ConfigService,
    VkService,
  ],
})
export class PostsModule {}
