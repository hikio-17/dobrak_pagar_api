import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create.article.dto';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async create(request: CreateArticleDto, user: any) {
    if (user.role !== 'CONTRIBUTOR' && user.role !== 'ADMIN') {
      throw new UnauthorizedException('Unauthorized');
    }

    const category = request.category;

    const value = await this.prisma.category.findFirst({
      where: { name: category },
    });

    const kategoriId = value.id;

    const article = await this.prisma.article.create({
      data: {
        ...request,
        author: { connect: { id: user.id } },
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

  async update(articleId: number, request: CreateArticleDto, user: any) {
    if (user.role !== 'CONTRIBUTOR' && user.role !== 'ADMIN') {
      throw new UnauthorizedException('Unauthorized');
    }
    const category = request.category;

    const value = await this.prisma.category.findFirst({
      where: { name: category },
    });

    const kategoriId = value.id;

    const article = await this.prisma.article.update({
      where: { id: articleId },
      data: {
        ...request,
        author: { connect: { id: user.id } },
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

  async deleteArticle(articleId: number, user: any) {
    if (user.role !== 'CONTRIBUTOR' && user.role !== 'ADMIN') {
      throw new UnauthorizedException('Unauthorized');
    }

    await this.prisma.article.delete({
      where: { id: articleId },
    });
  }
}
