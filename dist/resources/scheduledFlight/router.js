"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
// import {} from "./controller";
const router = (0, express_1.Router)();
router.get("/arrival/:airportCode", controller_1.scheduledFlightByArrivalAirportCode);
router.get("/departure/:airportCode", controller_1.scheduledFlightByDepartureAirportCode);
router.patch("/update/:id", controller_1.updatedScheduledFlight);
router.get("/:id/remainTickets", controller_1.getScheduledFlightStockByClass);
router.get("/:flightNumber", controller_1.getScheduledFlightsByFlightNumber);
router.get("/", controller_1.getScheduledFlightsByDateDepartureArrival);
exports.default = router;
//# sourceMappingURL=router.js.map