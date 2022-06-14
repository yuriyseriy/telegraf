import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { VkModule } from '../vk/vk.module';
import { VkService } from '../vk/vk.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), VkModule],
  controllers: [PostsController],
  providers: [PostsService, VkService],
})
export class PostsModule {}