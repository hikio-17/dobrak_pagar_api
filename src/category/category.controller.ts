import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, webResponse } from './dto/create.category.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiBody({ type: CreateCategoryDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createArticle(@Body() body: CreateCategoryDto): Promise<webResponse> {
    const category = await this.categoryService.createCategory(body);
    return {
      status: 'success',
      message: 'category is created',
      data: category,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllCategory(): Promise<webResponse> {
    const { category } = await this.categoryService.getAllCategory();

    return {
      status: 'success',
      message: 'get all articles',
      data: category,
    };
  }
}
