import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateFlightDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  flightNo?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  origin?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  originGate?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  destination?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  destinationGate?: string;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  departure?: Date;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  delayedDeparture?: Date;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  arrival?: Date;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  delayedArival?: Date;

  @IsNumber()
  @IsOptional()
  availableSeats?: number;

  @IsNumber()
  @IsOptional()
  airlineId?: number;
}
