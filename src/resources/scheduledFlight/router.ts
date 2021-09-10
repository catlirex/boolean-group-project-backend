import { Router } from "express";
import {
  scheduledFlightByArrivalAirportCode,
  scheduledFlightByDepartureAirportCode,
  updatedScheduledFlight,
  getScheduledFlightsByFlightNumber,
  getScheduledFlightsByDateDepartureArrival,
  getScheduledFlightStockByClass,
} from "./controller";
// import {} from "./controller";

const router = Router();

router.get("/arrival/:airportCode", scheduledFlightByArrivalAirportCode);
router.get("/departure/:airportCode", scheduledFlightByDepartureAirportCode);
router.patch("/update/:id", updatedScheduledFlight);
router.get("/:id/remainTickets", getScheduledFlightStockByClass);
router.get("/:flightNumber", getScheduledFlightsByFlightNumber);
router.get("/", getScheduledFlightsByDateDepartureArrival);

export default router;
