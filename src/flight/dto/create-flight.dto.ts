import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFlightDto {
  @IsString()
  @IsNotEmpty()
  flightNo: string;

  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsDate()
  @IsNotEmpty()
  departure: Date;

  @IsDate()
  @IsNotEmpty()
  arrival: Date;

  @IsNumber()
  availableSeats: number;

  @IsNumber()
  airlineId: number;
}
