import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreateCategoryResponseDto {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class webResponse {
  status: string;
  message: string;
  data?: object;
}
