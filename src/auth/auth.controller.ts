import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtGuard } from './guards/jwt.guard';
import { User } from '@prisma/client';
import { RefreshJwtGuard } from './guards';
import { GetUser } from './decorators/get-user.decorator';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetUser() user: User) {
    return this.authService.logout(user);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Headers('Authorization') authorization: string) {
    return this.authService.refresh(authorization);
  }

  @UseGuards(JwtGuard)
  @Get('/identify')
  @HttpCode(HttpStatus.OK)
  identity(@GetUser() user: User) {
    delete user.password;
    return user;
  }
}
