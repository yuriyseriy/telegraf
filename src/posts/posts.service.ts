import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { ListAllPosts } from './dto/list-all-posts';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  save(createPostDto: CreatePostDto) {
    return this.postsRepository.save(createPostDto);
  }

  async create(createPostDto: CreatePostDto) {
    const post = await this.postsRepository.findOne({
      where: { id: createPostDto.id },
    });
    if (post === null) {
      await this.postsRepository.save(createPostDto);
    }
  }

  async findAll(options: ListAllPosts) {
    // sort

    const [items, count] = await this.postsRepository.findAndCount({
      take: options.take,
      skip: options.skip,
    });

    return {
      count,
      items,
    };
  }

  findOne(id: number) {
    return this.postsRepository.findOneBy({ id });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async remove(id: number) {
    await this.postsRepository.softDelete(id);
  }
}
