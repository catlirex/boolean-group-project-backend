import { query, Request, Response } from "express";
import dbClient from "../../utils/database";

const { ticket } = dbClient;

// get	/ticket/:ticketid
export const getTicketById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const ticketById = await ticket.findUnique({
      where: { id },
    });
    res.json({ data: ticketById });
  } catch (error) {
    console.log(error);

    res.json({ error: "Not working" });
  }
};

//   get	/ticket?scheduledFlight=123
// QUERY ROUTE!!!!!! IMPORTANT
export const getAllTickets = async (req: Request, res: Response) => {
  const ticketQuery = req.query;
  try {
    if (ticketQuery.scheduledFlight) {
      console.log(ticketQuery.scheduledFlight);
      const numberQuery = Number(ticketQuery.scheduledFlight);

      const foundTicketQuery = await ticket.findMany({
        where: {
          scheduledFlightId: numberQuery,
        },
      });
      res.json({ data: foundTicketQuery });
    } else {
      const allTickets = await ticket.findMany({});
      res.json({ allTickets });
    }
  } catch (error) {
    console.log(error);

    res.json({ error: "Not working" });
  }
};

// patch /ticket/:id

export const updatedTicket = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const updatedInfo = req.body;

  try {
    const ticketExist = await ticket.findUnique({ where: { id } });

    if (ticketExist) {
      const ticketUpdate = await ticket.update({
        where: { id },
        data: { ...ticketExist, ...updatedInfo },
      });
      res.json({ data: ticketUpdate });
    } else {
      res.json({ data: "There is no ticket on this id" });
    }
  } catch (error) {
    res.json({ error: "Not working" });
  }
};
