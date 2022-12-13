import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAirlineDto, UpdateAirlineDto } from './dto';
import { Airline } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AirlineService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateAirlineDto) {
    const existingAirline = await this.prisma.airline.findUnique({
      where: {
        name: body.name,
      },
    });

    if (existingAirline) {
      throw new ConflictException('An airline with this name already exists');
    }

    return this.prisma.airline.create({
      data: body,
    });
  }

  async findById(id: number): Promise<Airline> {
    const airline = await this.prisma.airline.findUnique({
      where: {
        id,
      },
    });

    if (!airline) {
      throw new NotFoundException('Airline not found');
    }

    return airline;
  }

  async findAll(): Promise<Airline[]> {
    return this.prisma.airline.findMany();
  }

  async updateById(id: number, body: UpdateAirlineDto) {
    const airline = await this.prisma.airline.findUnique({
      where: {
        id,
      },
    });

    if (!airline) {
      throw new NotFoundException('Airline not found');
    }

    return await this.prisma.airline.update({
      where: {
        id,
      },
      data: body,
    });
  }

  async deleteById(id: number) {
    const airline = await this.prisma.airline.findUnique({
      where: {
        id,
      },
    });

    if (!airline) {
      throw new NotFoundException('Airline not found');
    }

    return await this.prisma.airline.delete({
      where: {
        id,
      },
    });
  }
}
