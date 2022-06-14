import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryColumn()
  id: number;

  @Column({
    type: 'text',
  })
  text: string;

  @Column({
    type: 'timestamp',
  })
  date: Date;
}
