import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Post } from './entities/post.entity';

@EventSubscriber()
export class PostsSubscriber implements EntitySubscriberInterface {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Post;
  }

  beforeInsert(event: InsertEvent<Post>) {
    console.log(`BEFORE USER INSERTED: `, event.entity);
  }

  afterInsert(event: InsertEvent<Post>) {
    console.log(`AFTER USER INSERTED: `, event.entity);
  }
}
