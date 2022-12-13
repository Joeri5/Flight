import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto';
import { Session } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService) {}

  async createSession(dto: CreateSessionDto) {
    const session = await this.prisma.session.findFirst({
      where: { userId: dto.userId },
    });

    if (session) {
      await this.deleteSession(session);
    }

    return await this.prisma.session.create({
      data: dto,
    });
  }

  async deleteSession({ id }: Session) {
    return await this.prisma.session.delete({
      where: { id },
    });
  }
}
