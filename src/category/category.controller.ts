import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, webResponse } from './dto/create.category.dto';
import { ApiBody } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiBody({ type: CreateCategoryDto })
  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createArticle(
    @Body() body: CreateCategoryDto,
    @Request() req,
  ): Promise<webResponse> {
    const category = await this.categoryService.createCategory(body, req.user);
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
      message: 'get all category',
      data: category,
    };
  }
}
