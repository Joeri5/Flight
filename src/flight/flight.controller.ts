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
import { FlightService } from './flight.service';
import { CreateFlightDto, UpdateFlightDto } from './dto';

@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateFlightDto) {
    return this.flightService.create(body);
  }

  @Get('/:flightNo')
  @HttpCode(HttpStatus.OK)
  findById(@Param('flightNo') flightNo: string, @Body() body: UpdateFlightDto) {
    return this.flightService.findById(flightNo);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.flightService.findAll();
  }

  @Patch('/:flightNo')
  @HttpCode(HttpStatus.OK)
  updateById(
    @Param('flightNo') flightNo: string,
    @Body() body: UpdateFlightDto,
  ) {
    return this.flightService.updateById(flightNo, body);
  }

  @Delete('/:flightNo')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('flightNo') flightNo: string) {
    return this.flightService.deleteById(flightNo);
  }
}
