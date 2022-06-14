import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { createDeflateRaw } from 'zlib';

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

  findAll() {
    return this.postsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
