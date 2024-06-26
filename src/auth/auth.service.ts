import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from './../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createUser(credentials: RegisterDto): Promise<User> {
    credentials.password = await this.hashPassword(credentials.password);
    let role;
    if (credentials.role) {
      role = credentials.role.toUpperCase();
    }
    return this.prisma.user.create({
      data: {
        ...credentials,
        role: role as Role,
      },
    });
  }

  async login(credentials: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: credentials.email },
    });

    if (!user) throw new UnauthorizedException('Credential not valid');

    const validPassword = await this.comparePassword(
      credentials.password,
      user.password,
    );

    if (!validPassword) throw new UnauthorizedException('Credential not valid');

    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }
}
