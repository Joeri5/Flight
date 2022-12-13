import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateAirlineDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  logo: string;
}
