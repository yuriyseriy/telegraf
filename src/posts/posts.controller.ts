import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { VkService } from '../vk/vk.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly vkService: VkService,
  ) {
  }

  @Post('parse')
  async parse() {
    const count = 100;
    const history = false;

    const posts = await this.vkService.loadPosts();
    for (const item of posts.items) {
      await this.postsService.save({
        id: item.id,
        text: item.text,
        date: new Date(item.date * 1000),
      });
    }

    if (history) {
      const totalPages = Math.ceil(posts.count / count);
      for (let i = 0; i < totalPages; i++) {
        const offset = count * i;

        const posts = await this.vkService.loadPosts(offset);
        for (const item of posts.items) {
          await this.postsService.save({
            id: item.id,
            text: item.text,
            date: new Date(item.date * 1000),
          });
        }
      }
    }
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get('count')
  async count() {
    const count = await this.postsService.findAll();

    return {
      count: count.length,
    };
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
