import { Request, response, Response } from "express";
import dbClient from "../../utils/database";
const { booking } = dbClient;

export const getBookingForOneUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.userId);
  try {
    const bookings = await booking.findMany({
      where: { userId: id },
      include: {
        BookExtraLuggage: { include: { ExtraLuggage: true } },
        tickets: {
          include: { scheduledFlight: { include: { flightNumber: true } } },
        },
      },
    });
    res.json(bookings);
  } catch (error) {
    console.log(error);
    res.json({ error: "user id incorrect" });
  }
};

export const getOneBookingDetail = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const bookings = await booking.findMany({
      where: { id },
      include: {
        BookExtraLuggage: { include: { ExtraLuggage: true } },
        tickets: {
          include: { scheduledFlight: { include: { flightNumber: true } } },
        },
      },
    });
    if (bookings.length) res.json(bookings);
    else res.json({ msg: "booking not found" });
  } catch (error) {
    console.log(error);
    res.json({ error: "booking id incorrect" });
  }
};

export const delOneBooking = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const deletedBooking = await booking.delete({
      where: { id },
      include: { tickets: true, BookExtraLuggage: true },
    });
    res.json({ deletedItem: deletedBooking });
  } catch (error) {
    console.log(error);
    res.json({ error: "fail to delete" });
  }
};

export const createBooking = async (req: Request, res: Response) => {
  const { userId, bookExtraLuggage, tickets } = req.body;
  try {
    const createdBooking = await booking.create({
      data: {
        userId,
        tickets: { create: tickets },
        BookExtraLuggage: { create: bookExtraLuggage },
      },
    });

    const createdBookingWithTicket = await booking.findUnique({
      where: { id: createdBooking.id },
      include: { BookExtraLuggage: true, tickets: true },
    });

    res.json(createdBookingWithTicket);
  } catch (error) {
    console.log(error);
    res.json({ Error: "fail to create booking" });
  }
};
