import { Controller, Req, Post, UseGuards, Body, Get } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '@/decorator/public-auth.decorator';
import { UserDto } from './dto/auth.dto';

@ApiTags('验证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: LoginDto, @Req() req: Request) {
    return await this.authService.login(req.user as UserDto);
  }

  @ApiBearerAuth()
  @Get('test')
  async test(@Req() req: Request) {
    return req.user;
  }
}
