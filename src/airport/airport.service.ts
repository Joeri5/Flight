import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAirportDto } from './dto';
import { Airport } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateAirportDto } from './dto/update-airport.dto';

@Injectable()
export class AirportService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateAirportDto) {
    const existingAirport = await this.prisma.airport.findUnique({
      where: {
        airportCode: body.airportCode,
      },
    });

    if (existingAirport) {
      throw new ConflictException('An airport with this name already exists');
    }

    return this.prisma.airport.create({
      data: body,
    });
  }

  async findById(airportCode: string): Promise<Airport> {
    const airport = await this.prisma.airport.findUnique({
      where: {
        airportCode,
      },
    });

    if (!airport) {
      throw new NotFoundException('Airport not found');
    }

    return airport;
  }

  async findAll(): Promise<Airport[]> {
    return this.prisma.airport.findMany();
  }

  async updateById(airportCode: string, body: UpdateAirportDto) {
    const airport = await this.prisma.airport.findUnique({
      where: {
        airportCode,
      },
    });

    if (!airport) {
      throw new NotFoundException('Airport not found');
    }

    return await this.prisma.airport.update({
      where: {
        airportCode,
      },
      data: body,
    });
  }

  async deleteById(airportCode: string) {
    const airport = await this.prisma.airport.findUnique({
      where: {
        airportCode,
      },
    });

    if (!airport) {
      throw new NotFoundException('Airport not found');
    }

    return await this.prisma.airport.delete({
      where: {
        airportCode,
      },
    });
  }
}
