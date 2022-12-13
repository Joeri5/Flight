import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { SessionService } from '../../session/session.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly sessions: SessionService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: any) {
    if (payload.refresh) {
      return null;
    }

    if (typeof payload.sub !== 'string') {
      return null;
    }

    const session = await this.prisma.session.findUnique({
      where: {
        id: payload.sub,
      },
      include: {
        user: true,
      },
    });

    if (!session) {
      return null;
    }

    delete session.user.password;
    return session.user;
  }
}
