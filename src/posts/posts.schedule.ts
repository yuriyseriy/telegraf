import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { VkService } from '../vk/vk.service';
import { PostsService } from './posts.service';

@Injectable()
export class PostsSchedule {
  private readonly logger = new Logger(PostsSchedule.name);

  constructor(
    private readonly vkService: VkService,
    private readonly postsService: PostsService,
  ) {}

  async run(count = 100, history = false) {
    console.log('run', count, history);

    const posts = await this.vkService.loadPosts();
    for (const item of posts.items) {
      await this.postsService.save({
        id: item.id,
        text: item.text,
        date: new Date(item.date * 1000),
      });
    }
  }

  // every 1 minute
  // @Cron(CronExpression.EVERY_10_MINUTES)
  @Cron('0 */1 * * * *')
  async handleCron() {
    await this.run();

    // const posts = await this.vkService.loadPosts();
    // console.log(posts.count);
    // console.log(posts.items.length);
    // this.logger.debug('5 seconds', posts);
  }
}
