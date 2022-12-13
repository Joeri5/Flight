import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Flight } from '@prisma/client';
import { CreateFlightDto, UpdateFlightDto } from './dto';

@Injectable()
export class FlightService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateFlightDto) {
    const existingFlight = await this.prisma.flight.findUnique({
      where: {
        flightNo: body.flightNo,
      },
    });

    if (existingFlight) {
      throw new ConflictException('An flight with this name already exists');
    }

    return this.prisma.flight.create({
      data: body,
    });
  }

  async findById(flightNo: string): Promise<Flight> {
    const flight = await this.prisma.flight.findUnique({
      where: {
        flightNo,
      },
    });

    if (!flight) {
      throw new NotFoundException('Flight not found');
    }

    return flight;
  }

  async findAll(): Promise<Flight[]> {
    return this.prisma.flight.findMany();
  }

  async updateById(flightNo: string, body: UpdateFlightDto) {
    const flight = await this.prisma.flight.findUnique({
      where: {
        flightNo,
      },
    });

    if (!flight) {
      throw new NotFoundException('Flight not found');
    }

    return await this.prisma.flight.update({
      where: {
        flightNo,
      },
      data: body,
    });
  }

  async deleteById(flightNo: string) {
    const flight = await this.prisma.flight.findUnique({
      where: {
        flightNo,
      },
    });

    if (!flight) {
      throw new NotFoundException('Flight not found');
    }

    return await this.prisma.flight.delete({
      where: {
        flightNo,
      },
    });
  }
}
