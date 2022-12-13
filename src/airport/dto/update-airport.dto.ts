import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAirportDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  airportCode?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  location?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;
}
