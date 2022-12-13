import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('REFRESH_JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    if (!payload.refresh) {
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
    return payload;
  }
}
