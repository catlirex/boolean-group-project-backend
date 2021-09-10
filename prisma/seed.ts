import { PrismaClient, Role, TicketStatus } from "@prisma/client";
import faker from "faker";
const prisma = new PrismaClient();
const {
  airportList,
  airlineList,
  aircraftList,
  extraLuggageList,
  flightNumberList,
  getRandomInt,
} = require("../src/utils/mockData");

const flightStatusArray = [
  "SCHEDULED",
  "BOARDING",
  "CHECKIN",
  "FINALCALL",
  "DELAYED",
  "CANCELLED",
  "DEPARTED",
  "ARRIVED",
];

const ticketStatusArray = [
  "CONFIRMED",
  "ONLINECHECKIN",
  "LUGGAGECHECKIN",
  "ONBOARD",
  "CANCELLED",
];

const classArray = ["econ", "business", "first"];

const getRandomElement = (array: string[]) => {
  const number = Math.floor(Math.random() * array.length);
  return array[number];
};

async function seed() {
  const createUserList = [];
  const numOfUser = getRandomInt(20, 30);
  for (let i = 0; i < numOfUser; i++) {
    const userData = {
      firstName: faker.name.findName(),
      lastName: faker.name.lastName(),
      password: `${getRandomInt(100, 999)}`,
      email: faker.internet.email(),
    };
    const createdUser = await prisma.user.create({
      data: userData,
    });
    console.log(createdUser);
    createUserList.push(createdUser);
  }

  for (const user of createUserList) {
    const numOfBooking = getRandomInt(5, 10);
    for (let i = 0; i < numOfBooking; i++) {
      const bookingData = {
        userId: user.id,
        BookExtraLuggage: {
          create: [
            {
              quantity: getRandomInt(1, 3),
              ExtraLuggage: { connect: { id: getRandomInt(1, 3) } },
            },
          ],
        },
      };
      const createdBooking = await prisma.booking.create({
        data: bookingData,
      });
      console.log(createdBooking);

      const numbOfTickets = getRandomInt(1, 5);
      const randomClass = getRandomElement(classArray);
      const randomStatus = getRandomElement(ticketStatusArray);
      const scheduledFlightId = getRandomInt(1, 332);
      for (let i = 0; i < numbOfTickets; i++) {
        let ticketData = {
          class: randomClass,
          status: randomStatus as TicketStatus,
          Booking: { connect: { id: createdBooking.id } },
          scheduledFlight: { connect: { id: scheduledFlightId } },
        };
        const createdTicket = await prisma.ticket.create({
          data: ticketData,
        });

        console.log(createdTicket);
      }
    }
  }

  // const createStaffList = [];
  // const numOfStaff = 5;
  // for (let i = 0; i < numOfStaff; i++) {
  //   const staffData = {
  //     role: "STAFF" as Role,
  //     firstName: faker.name.findName(),
  //     lastName: faker.name.lastName(),
  //     password: `${getRandomInt(100, 999)}`,
  //     email: faker.internet.email(),
  //   };

  //   const createdStaff = await prisma.user.create({
  //     data: staffData,
  //   });
  //   console.log(createdStaff);
  //   createStaffList.push(createdStaff);
  // }

  // const createdAirportList = [];
  // for (const airportData of airportList) {
  //   const createdAirport = await prisma.airport.create({ data: airportData });
  //   console.log(createdAirport);
  //   createdAirportList.push(createdAirport);
  // }

  // const createdAirlineList = [];
  // for (const airlineData of airlineList) {
  //   const createdAirline = await prisma.airline.create({ data: airlineData });
  //   console.log(createdAirline);
  //   createdAirlineList.push(createdAirline);
  // }

  // const createdAircraftList = [];
  // for (const aircraftData of aircraftList) {
  //   const createdAirCraft = await prisma.aircraft.create({
  //     data: aircraftData,
  //   });
  //   console.log(createdAirCraft);
  //   createdAircraftList.push(createdAirCraft);
  // }

  // const createdExtraLuggageList = [];
  // for (const extraLuggageData of extraLuggageList) {
  //   const createdExtraLuggage = await prisma.extraLuggage.create({
  //     data: extraLuggageData,
  //   });
  //   console.log(createdExtraLuggage);
  //   createdExtraLuggageList.push(createdExtraLuggage);
  // }
  // const aircraftIdArray = aircraftList.map((target: any) => target.id);

  // const createdFlightNumberList = [];
  // const createdScheduleFlightList = [];

  // for (const flightNumber of flightNumberList) {
  //   const { airlineId, ...flightData } = flightNumber;
  //   const createdFlightNumber = await prisma.flightNumber.create({
  //     data: {
  //       ...flightData,
  //       airlineId: airlineId,
  //       aircraftId: getRandomElement(aircraftIdArray),
  //     },
  //   });
  //   console.log(createdFlightNumber);
  //   createdFlightNumberList.push(createdFlightNumber);

  //   const numOfScheduledFlight = getRandomInt(1, 6);

  //   for (let i = 0; i < numOfScheduledFlight; i++) {
  //     let randomDate = [2021, getRandomInt(10, 11), getRandomInt(10, 31)];
  //     let randomTime = [getRandomInt(10, 23), getRandomInt(10, 59)];
  //     const scheduleFlightData = {
  //       date: parseInt(randomDate.join("")),
  //       time: randomTime.join(":"),
  //       economicPrice: getRandomInt(0, 40),
  //       businessPrice: getRandomInt(100, 300),
  //       firstClassPrice: getRandomInt(300, 1000),
  //       gateNumber: "A" + getRandomInt(1, 50),
  //       flightNumber: { connect: { id: createdFlightNumber.id } },
  //       status: getRandomElement(flightStatusArray) as FlightStatus,
  //     };

  //     const createdScheduleFlight = await prisma.scheduledFlight.create({
  //       data: scheduleFlightData,
  //     });
  //     console.log(createdScheduleFlight);
  //     createdScheduleFlightList.push(createdScheduleFlight);
  //   }
  // }
}

seed()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
