import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import {
  CreateArticleDto,
  CreateArticleResponseDto,
} from './dto/create.article.dto';
import { ArticleService } from './article.service';
import {
  GetAllArticleResponseDto,
  GetByIdArticleResponseDto,
} from './dto/get.article.tdo';
import {
  UpdateArticleDto,
  UpdateArticleResponseDto,
} from './dto/update.article.dto';
import { DeleteArticleResponseDto } from './dto/delete.article.dto';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @ApiBody({ type: CreateArticleDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createArticle(
    @Body() body: CreateArticleDto,
  ): Promise<CreateArticleResponseDto> {
    const article = await this.articleService.create(body);
    return {
      status: 'success',
      message: 'article is created',
      data: article,
    };
  }

  //   @ApiBody({ type: GetAllArticleResponseDto })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllArticle(): Promise<GetAllArticleResponseDto> {
    const articles = await this.articleService.getAll();
    return {
      status: 'success',
      message: 'get all articles',
      data: articles,
    };
  }

  //   @ApiBody({ type: GetByIdArticleResponseDto })
  @Get('/:articleId')
  @HttpCode(HttpStatus.OK)
  async getByIdArticle(
    @Param('articleId', ParseIntPipe) articleId: number,
  ): Promise<GetByIdArticleResponseDto> {
    const articles = await this.articleService.getById(articleId);
    return {
      status: 'success',
      message: `get article by id ${articleId}`,
      data: articles,
    };
  }

  @ApiBody({ type: UpdateArticleDto })
  @Put('/:articleId')
  @HttpCode(HttpStatus.OK)
  async updateArticle(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Body() body: UpdateArticleDto,
  ): Promise<UpdateArticleResponseDto> {
    const article = await this.articleService.update(articleId, body);
    return {
      status: 'success',
      message: 'article is updated',
      data: article,
    };
  }

  @Delete('/:articleId')
  @HttpCode(HttpStatus.OK)
  async deleteArticle(
    @Param('articleId', ParseIntPipe) articleId: number,
  ): Promise<DeleteArticleResponseDto> {
    await this.articleService.deleteArticle(articleId);
    return {
      data: true,
    };
  }
}
