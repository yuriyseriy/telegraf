import { Injectable } from '@nestjs/common';
import axios from 'axios';

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
  async loadPosts(offset: number = 0) {
    const access_token =
      '6b5a23296b5a23296b5a2329576b34d8d566b5a6b5a2329354ec02080bbafd8baf581a1';
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
