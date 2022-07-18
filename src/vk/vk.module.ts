import { Module } from '@nestjs/common';
import { VkService } from './vk.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [VkService, ConfigService],
})
export class VkModule {}
