import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCategoryDto,
  CreateCategoryResponseDto,
} from './dto/create.category.dto';
import { GetCategoryResponseDto } from './dto/get.category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(
    request: CreateCategoryDto,
  ): Promise<CreateCategoryResponseDto> {
    const exisCategory = await this.prisma.category.findFirst({
      where: { name: request.name },
    });

    if (exisCategory)
      throw new ConflictException('Category with the same name already exists');

    return await this.prisma.category.create({
      data: request,
    });
  }

  async getAllCategory(): Promise<GetCategoryResponseDto> {
    const categories = await this.prisma.category.findMany();
    if (!categories) throw new ConflictException('No categories found');
    console.log(categories);

    return {
      category: categories,
    };
  }
}
