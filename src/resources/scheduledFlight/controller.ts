import { Request, Response } from "express";

import dbClient from "../../utils/database";

const { scheduledFlight, ticket } = dbClient;

export const scheduledFlightByArrivalAirportCode = async (
  req: Request,
  res: Response
) => {
  const id = req.params.airportCode;
  try {
    const schFlightByArrivalAirportCode = await scheduledFlight.findMany({
      where: {
        status: { in: ["DEPARTED", "ARRIVED"] },
        flightNumber: {
          is: {
            arrivalAirportId: id,
          },
        },
      },

      include: { flightNumber: true },
    });
    res.json({ data: schFlightByArrivalAirportCode });
  } catch (error) {
    console.log(error);

    res.json({ error: "Not working" });
  }
};

export const scheduledFlightByDepartureAirportCode = async (
  req: Request,
  res: Response
) => {
  const id = req.params.airportCode;
  try {
    const schFlightByDepartureAirportCode = await scheduledFlight.findMany({
      where: {
        status: {
          in: [
            "SCHEDULED",
            "BOARDING",
            "CHECKIN",
            "FINALCALL",
            "DELAYED",
            "CANCELLED",
          ],
        },
        flightNumber: {
          is: {
            departureAirportId: id,
          },
        },
      },

      include: { flightNumber: true },
    });
    res.json({ data: schFlightByDepartureAirportCode });
  } catch (error) {
    console.log(error);

    res.json({ error: "Not working" });
  }
};

export const updatedScheduledFlight = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const updatedInfo = req.body;

  try {
    const schedulFlightExist = await scheduledFlight.findUnique({
      where: { id },
    });

    if (schedulFlightExist) {
      const schedulFlightUpdate = await scheduledFlight.update({
        where: { id },
        data: { ...schedulFlightExist, ...updatedInfo },
        include: { flightNumber: true },
      });
      res.json({ data: schedulFlightUpdate });
    } else {
      res.json({ data: "There is no flight at the moment" });
    }
  } catch (error) {
    res.json({ error: "Not working" });
  }
};

// get	/scheduledFlight/:flightNumber?date=20211010
export const getScheduledFlightsByFlightNumber = async (
  req: Request,
  res: Response
) => {
  const flightQuery = req.query;
  const id = req.params.flightNumber;

  try {
    const allScheduledFlightsByFlightNumber = await scheduledFlight.findMany({
      where: { flightNumberId: id },
    });

    if (flightQuery.date) {
      const flightNumberQuery = Number(flightQuery.date);

      const result = await scheduledFlight.findMany({
        where: {
          date: flightNumberQuery,
          flightNumberId: id,
        },
        include: { flightNumber: { include: { airline: true } } },
      });
      res.json({ data: result });
    } else {
      res.json({ data: allScheduledFlightsByFlightNumber });
    }
  } catch (error) {
    res.json({ error: error });
    console.log(error);
  }
};

// get	/scheduledFlight?date=2021-10-10&depart=airportCode&arrival=airportCode

export const getScheduledFlightsByDateDepartureArrival = async (
  req: Request,
  res: Response
) => {
  const { date, depart, arrival } = req.query;

  try {
    if (!date && depart && arrival) {
      const result = await scheduledFlight.findMany({
        where: {
          flightNumber: {
            is: {
              departureAirportId: depart,
              arrivalAirportId: arrival,
            },
          },
        },
        include: {
          flightNumber: { include: { airline: true } },
        },
      });
      res.json({ data: result });
    } else if (date && depart && arrival) {
      const result = await scheduledFlight.findMany({
        where: {
          date: Number(date),
          flightNumber: {
            is: {
              departureAirportId: depart,
              arrivalAirportId: arrival,
            },
          },
        },
        include: {
          flightNumber: { include: { airline: true } },
        },
      });
      res.json({ data: result });
    } else {
      const allFlights = await scheduledFlight.findMany({});
      res.json({ data: allFlights });
    }
  } catch (error) {
    console.log(error);

    res.json({ error: error });
  }
};

// get	/scheduledFlight/:id/remainTicket/?class=business

export const getScheduledFlightStockByClass = async (
  req: Request,
  res: Response
) => {
  const id = parseInt(req.params.id);

  const classToCheck = req.query;

  try {
    if (classToCheck.class) {
      const foundTicket = await ticket.findMany({
        where: {
          scheduledFlightId: id,
          class: classToCheck.class,
        },
      });
      const seatForTheClass = await scheduledFlight.findUnique({
        where: { id },
        include: { flightNumber: { include: { aircraft: true } } },
      });

      if (classToCheck.class === "first")
        res.json({
          ticketRemain:
            seatForTheClass.flightNumber.aircraft.firstClassSeatNumber -
            foundTicket.length,
        });
      if (classToCheck.class === "business")
        res.json({
          ticketRemain:
            seatForTheClass.flightNumber.aircraft.businessSeatNumber -
            foundTicket.length,
        });
      if (classToCheck.class === "econ")
        res.json({
          ticketRemain:
            seatForTheClass.flightNumber.aircraft.econSeatNumber -
            foundTicket.length,
        });
    }
  } catch (error) {
    console.log(error);

    res.json({ error: error });
  }
};

// _count: {
//   select: {
//     passengers: {
//       class: {
//         in: ["business", "economic", "firstclass"],
//       },
//     },
//   },
// },
