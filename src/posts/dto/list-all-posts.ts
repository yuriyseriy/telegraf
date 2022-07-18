import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ListAllPosts {
  @IsOptional()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  take = 20;

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  skip = 0;
}
