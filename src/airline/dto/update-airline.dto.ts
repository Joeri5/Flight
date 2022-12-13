import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateAirlineDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @IsOptional()
  logo?: string;
}
