import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

interface Post {
  id: number;
  text: string;
  date: number;
}

interface WallResponse {
  response: {
    count: number;
    items: Post[];
  };
}

@Injectable()
export class VkService {
  constructor(private readonly configService: ConfigService) {}

  async loadPosts(offset = 0) {
    const access_token = this.configService.get('VK_ACCESS_TOKEN');
    const domain = 'filternative';
    const count = 100;
    const v = '5.131';

    const res = await axios.get<WallResponse>(
      'https://api.vk.com/method/wall.get',
      {
        params: {
          access_token,
          domain,
          offset,
          count,
          v,
        },
      },
    );

    return res.data.response;
  }
}
