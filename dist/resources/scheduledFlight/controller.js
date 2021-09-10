"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScheduledFlightStockByClass = exports.getScheduledFlightsByDateDepartureArrival = exports.getScheduledFlightsByFlightNumber = exports.updatedScheduledFlight = exports.scheduledFlightByDepartureAirportCode = exports.scheduledFlightByArrivalAirportCode = void 0;
const database_1 = __importDefault(require("../../utils/database"));
const { scheduledFlight, ticket } = database_1.default;
const scheduledFlightByArrivalAirportCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.airportCode;
    try {
        const schFlightByArrivalAirportCode = yield scheduledFlight.findMany({
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
    }
    catch (error) {
        console.log(error);
        res.json({ error: "Not working" });
    }
});
exports.scheduledFlightByArrivalAirportCode = scheduledFlightByArrivalAirportCode;
const scheduledFlightByDepartureAirportCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.airportCode;
    try {
        const schFlightByDepartureAirportCode = yield scheduledFlight.findMany({
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
    }
    catch (error) {
        console.log(error);
        res.json({ error: "Not working" });
    }
});
exports.scheduledFlightByDepartureAirportCode = scheduledFlightByDepartureAirportCode;
const updatedScheduledFlight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const updatedInfo = req.body;
    try {
        const schedulFlightExist = yield scheduledFlight.findUnique({
            where: { id },
        });
        if (schedulFlightExist) {
            const schedulFlightUpdate = yield scheduledFlight.update({
                where: { id },
                data: Object.assign(Object.assign({}, schedulFlightExist), updatedInfo),
                include: { flightNumber: true },
            });
            res.json({ data: schedulFlightUpdate });
        }
        else {
            res.json({ data: "There is no flight at the moment" });
        }
    }
    catch (error) {
        res.json({ error: "Not working" });
    }
});
exports.updatedScheduledFlight = updatedScheduledFlight;
// get	/scheduledFlight/:flightNumber?date=20211010
const getScheduledFlightsByFlightNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const flightQuery = req.query;
    const id = req.params.flightNumber;
    try {
        const allScheduledFlightsByFlightNumber = yield scheduledFlight.findMany({
            where: { flightNumberId: id },
        });
        if (flightQuery.date) {
            const flightNumberQuery = Number(flightQuery.date);
            const result = yield scheduledFlight.findMany({
                where: {
                    date: flightNumberQuery,
                    flightNumberId: id,
                },
                include: { flightNumber: { include: { airline: true } } },
            });
            res.json({ data: result });
        }
        else {
            res.json({ data: allScheduledFlightsByFlightNumber });
        }
    }
    catch (error) {
        res.json({ error: error });
        console.log(error);
    }
});
exports.getScheduledFlightsByFlightNumber = getScheduledFlightsByFlightNumber;
// get	/scheduledFlight?date=2021-10-10&depart=airportCode&arrival=airportCode
const getScheduledFlightsByDateDepartureArrival = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, depart, arrival } = req.query;
    try {
        if (!date && depart && arrival) {
            const result = yield scheduledFlight.findMany({
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
        }
        else if (date && depart && arrival) {
            const result = yield scheduledFlight.findMany({
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
        }
        else {
            const allFlights = yield scheduledFlight.findMany({});
            res.json({ data: allFlights });
        }
    }
    catch (error) {
        console.log(error);
        res.json({ error: error });
    }
});
exports.getScheduledFlightsByDateDepartureArrival = getScheduledFlightsByDateDepartureArrival;
// get	/scheduledFlight/:id/remainTicket/?class=business
const getScheduledFlightStockByClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const classToCheck = req.query;
    try {
        if (classToCheck.class) {
            const foundTicket = yield ticket.findMany({
                where: {
                    scheduledFlightId: id,
                    class: classToCheck.class,
                },
            });
            const seatForTheClass = yield scheduledFlight.findUnique({
                where: { id },
                include: { flightNumber: { include: { aircraft: true } } },
            });
            if (classToCheck.class === "first")
                res.json({
                    ticketRemain: seatForTheClass.flightNumber.aircraft.firstClassSeatNumber -
                        foundTicket.length,
                });
            if (classToCheck.class === "business")
                res.json({
                    ticketRemain: seatForTheClass.flightNumber.aircraft.businessSeatNumber -
                        foundTicket.length,
                });
            if (classToCheck.class === "econ")
                res.json({
                    ticketRemain: seatForTheClass.flightNumber.aircraft.econSeatNumber -
                        foundTicket.length,
                });
        }
    }
    catch (error) {
        console.log(error);
        res.json({ error: error });
    }
});
exports.getScheduledFlightStockByClass = getScheduledFlightStockByClass;
// _count: {
//   select: {
//     passengers: {
//       class: {
//         in: ["business", "economic", "firstclass"],
//       },
//     },
//   },
// },
//# sourceMappingURL=controller.js.map