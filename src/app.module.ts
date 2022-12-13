import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AirlineModule } from './airline/airline.module';
import { FlightModule } from './flight/flight.module';
import { BookingModule } from './booking/booking.module';
import { UserModule } from './user/user.module';
import { PassengerModule } from './passenger/passenger.module';
import { AirportController } from './airport/airport.controller';
import { AirportService } from './airport/airport.service';
import { AirportModule } from './airport/airport.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AirlineModule,
    FlightModule,
    BookingModule,
    UserModule,
    PassengerModule,
    AirportModule,
  ],
  controllers: [AirportController],
  providers: [AirportService],
})
export class AppModule {}
