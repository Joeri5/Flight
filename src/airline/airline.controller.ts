import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateAirlineDto, UpdateAirlineDto } from './dto';
import * as path from 'path';
import { AirlineService } from './airline.service';

@Controller('/airline')
export class AirlineController {
  constructor(private readonly airlineService: AirlineService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateAirlineDto) {
    return this.airlineService.create(body);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAirlineDto,
  ) {
    return this.airlineService.findById(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.airlineService.findAll();
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAirlineDto,
  ) {
    return this.airlineService.updateById(id, body);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.airlineService.deleteById(id);
  }
}
