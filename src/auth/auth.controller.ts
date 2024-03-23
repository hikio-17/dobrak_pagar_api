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
import { AuthService } from './auth.service';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @Post()
  @HttpCode(HttpStatus.OK)
  async signin(@Body() body: LoginDto): Promise<LoginResponseDto> {
    const { token } = await this.authService.login(body);
    return {
      status: 'success',
      token,
    };
  }

  @ApiBody({ type: RegisterDto })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() body: RegisterDto): Promise<RegisterResponseDto> {
    const user = await this.authService.createUser(body);
    return {
      status: 'success',
      message: 'user is created',
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
