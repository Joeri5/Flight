import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { TokenSet } from './types';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SessionService } from '../session/session.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly sessions: SessionService,
  ) {}
  async register({ password, ...dto }: CreateUserDto) {
    if (await this.prisma.user.findUnique({ where: { email: dto.email } })) {
      throw new ConflictException('EmailDuplicate');
    }

    const hashedPassword = await argon.hash(password);
    await this.prisma.user.create({
      data: {
        ...dto,
        password: hashedPassword,
      },
    });
  }

  async login(dto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !(await argon.verify(user.password, dto.password))) {
      throw new UnauthorizedException('Unauthorized');
    }

    const { id } = await this.sessions.createSession({
      userId: user.id,
    });

    const { accessToken, refreshToken } = await this.createCredentials(
      user,
      id,
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async logout(user: User) {
    const sessions = await this.prisma.session.findFirst({
      where: { userId: user.id },
    });
    await this.sessions.deleteSession(sessions);
  }

  async refresh(authorization: string) {
    const token = authorization.substring('Bearer '.length);

    const session = await this.prisma.session.findFirst({
      where: { refreshToken: token },
      include: { user: true },
    });

    await this.sessions.deleteSession(session);

    const { id } = await this.sessions.createSession({
      userId: session.user.id,
    });

    const { accessToken, refreshToken } = await this.createCredentials(
      session.user,
      id,
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async createCredentials(user: User, id: string): Promise<TokenSet> {
    const payload = {
      sub: id,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get('JWT_SECRET_KEY'),
      expiresIn: '1w',
    });

    const refreshToken = await this.jwtService.signAsync(
      { refresh: true, ...payload },
      {
        secret: this.config.get('REFRESH_JWT_SECRET'),
        expiresIn: '2w',
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
