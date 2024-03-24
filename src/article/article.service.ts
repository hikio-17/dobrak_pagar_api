import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create.article.dto';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async create(request: CreateArticleDto) {
    const category = request.category;
    const userId = 1;

    const value = await this.prisma.category.findFirst({
      where: { name: category },
    });

    const kategoriId = value.id;
    const cover = 'https://dobrak-pagar/cover.jpg';

    const article = await this.prisma.article.create({
      data: {
        ...request,
        cover: cover,
        author: { connect: { id: userId } },
        category: { connect: { id: kategoriId } },
      },
      include: {
        author: { select: { fullname: true } },
        category: { select: { name: true } },
      },
    });

    const authorName = article.author.fullname;
    const categoryName = article.category.name;
    const result = { ...article, author: authorName, category: categoryName };

    return result;
  }

  async getAll() {
    const articles = await this.prisma.article.findMany({
      include: {
        author: { select: { fullname: true } },
        category: { select: { name: true } },
      },
    });
    const result = articles.map((article) => {
      const authorName = article.author.fullname;
      const categoryName = article.category.name;
      return { ...article, author: authorName, category: categoryName };
    });
    return result;
  }

  async getById(articleId: number) {
    const article = await this.prisma.article.findFirst({
      where: { id: articleId },
      include: {
        author: { select: { fullname: true } },
        category: { select: { name: true } },
      },
    });

    const authorName = article.author.fullname;
    const categoryName = article.category.name;
    return { ...article, author: authorName, category: categoryName };
  }

  async update(articleId: number, request: CreateArticleDto) {
    const category = request.category;
    const userId = 1;

    const value = await this.prisma.category.findFirst({
      where: { name: category },
    });

    const kategoriId = value.id;
    const cover = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

    const article = await this.prisma.article.update({
      where: { id: articleId },
      data: {
        ...request,
        cover: cover,
        author: { connect: { id: userId } },
        category: { connect: { id: kategoriId } },
      },
      include: {
        author: { select: { fullname: true } },
        category: { select: { name: true } },
      },
    });

    const authorName = article.author.fullname;
    const categoryName = article.category.name;
    const result = { ...article, author: authorName, category: categoryName };

    return result;
  }

  async deleteArticle(articleId: number) {
    await this.prisma.article.delete({
      where: { id: articleId },
    });
  }
}
