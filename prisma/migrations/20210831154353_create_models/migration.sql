-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'STAFF');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('CONFIRMED', 'ONLINECHECKIN', 'LUGGAGECHECKIN', 'ONBOARD', 'CANCELLED');

-- CreateTable
CREATE TABLE "Airport" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "cityImage" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aircraft" (
    "id" TEXT NOT NULL,
    "econSeatNumber" INTEGER NOT NULL,
    "businessSeatNumber" INTEGER NOT NULL,
    "firstClassSeatNumber" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Airline" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "economicLuggage" INTEGER NOT NULL,
    "businessLuggage" INTEGER NOT NULL,
    "firstClassLuggage" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlightNumber" (
    "id" TEXT NOT NULL,
    "durationHour" INTEGER NOT NULL,
    "airlineId" TEXT NOT NULL,
    "departureAirportId" TEXT NOT NULL,
    "arrivalAirportId" TEXT NOT NULL,
    "aircraftId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduledFlight" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "time" TIME(0) NOT NULL,
    "economicPrice" DOUBLE PRECISION NOT NULL,
    "businessPrice" DOUBLE PRECISION NOT NULL,
    "firstClassPrice" DOUBLE PRECISION NOT NULL,
    "gateNumber" TEXT NOT NULL,
    "flightNumberId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'USER',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "class" TEXT NOT NULL,
    "passengerFirstName" TEXT,
    "passengerLastName" TEXT,
    "specialMeal" TEXT,
    "seatNumer" TEXT,
    "status" "TicketStatus" NOT NULL,
    "passpostNumber" TEXT,
    "bookingId" INTEGER,
    "scheduledFlightId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExtraLuggage" (
    "id" SERIAL NOT NULL,
    "weight" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookExtraLuggage" (
    "id" SERIAL NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "extraLuggageId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FlightNumber" ADD FOREIGN KEY ("airlineId") REFERENCES "Airline"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlightNumber" ADD FOREIGN KEY ("departureAirportId") REFERENCES "Airport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlightNumber" ADD FOREIGN KEY ("arrivalAirportId") REFERENCES "Airport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlightNumber" ADD FOREIGN KEY ("aircraftId") REFERENCES "Aircraft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledFlight" ADD FOREIGN KEY ("flightNumberId") REFERENCES "FlightNumber"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD FOREIGN KEY ("scheduledFlightId") REFERENCES "ScheduledFlight"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookExtraLuggage" ADD FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookExtraLuggage" ADD FOREIGN KEY ("extraLuggageId") REFERENCES "ExtraLuggage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
