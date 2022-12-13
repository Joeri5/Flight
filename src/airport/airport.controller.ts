import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateAirportDto } from './dto';
import { AirportService } from './airport.service';
import { UpdateAirportDto } from './dto/update-airport.dto';

@Controller('airport')
export class AirportController {
  constructor(private readonly airportService: AirportService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateAirportDto) {
    return this.airportService.create(body);
  }

  @Get('/:airportCode')
  @HttpCode(HttpStatus.OK)
  findById(
    @Param('airportCode') airportCode: string,
    @Body() body: UpdateAirportDto,
  ) {
    return this.airportService.findById(airportCode);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.airportService.findAll();
  }

  @Patch('/:airportCode')
  @HttpCode(HttpStatus.OK)
  updateById(
    @Param('airportCode') airportCode: string,
    @Body() body: UpdateAirportDto,
  ) {
    return this.airportService.updateById(airportCode, body);
  }

  @Delete('/:airportCode')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('airportCode') airportCode: string) {
    return this.airportService.deleteById(airportCode);
  }
}
