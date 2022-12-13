import { IsJWT, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSessionDto {
  userId: number;
}
