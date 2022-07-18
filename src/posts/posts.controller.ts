import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { VkService } from '../vk/vk.service';
import { ListAllPosts } from './dto/list-all-posts';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly vkService: VkService,
  ) {}

  @Post('parse')
  async parse() {
    const count = 100;
    const history = true;

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

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() query: ListAllPosts) {
    return this.postsService.findAll(query);
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
  async remove(@Param('id') id: string) {
    await this.postsService.remove(+id);
  }
}
