import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAirportDto {
  @IsNotEmpty()
  @IsString()
  airportCode: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
