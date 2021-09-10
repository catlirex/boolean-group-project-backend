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
exports.updatedTicket = exports.getAllTickets = exports.getTicketById = void 0;
const database_1 = __importDefault(require("../../utils/database"));
const { ticket } = database_1.default;
// get	/ticket/:ticketid
const getTicketById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const ticketById = yield ticket.findUnique({
            where: { id },
        });
        res.json({ data: ticketById });
    }
    catch (error) {
        console.log(error);
        res.json({ error: "Not working" });
    }
});
exports.getTicketById = getTicketById;
//   get	/ticket?scheduledFlight=123
// QUERY ROUTE!!!!!! IMPORTANT
const getAllTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ticketQuery = req.query;
    try {
        if (ticketQuery.scheduledFlight) {
            console.log(ticketQuery.scheduledFlight);
            const numberQuery = Number(ticketQuery.scheduledFlight);
            const foundTicketQuery = yield ticket.findMany({
                where: {
                    scheduledFlightId: numberQuery,
                },
            });
            res.json({ data: foundTicketQuery });
        }
        else {
            const allTickets = yield ticket.findMany({});
            res.json({ allTickets });
        }
    }
    catch (error) {
        console.log(error);
        res.json({ error: "Not working" });
    }
});
exports.getAllTickets = getAllTickets;
// patch /ticket/:id
const updatedTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const updatedInfo = req.body;
    try {
        const ticketExist = yield ticket.findUnique({ where: { id } });
        if (ticketExist) {
            const ticketUpdate = yield ticket.update({
                where: { id },
                data: Object.assign(Object.assign({}, ticketExist), updatedInfo),
            });
            res.json({ data: ticketUpdate });
        }
        else {
            res.json({ data: "There is no ticket on this id" });
        }
    }
    catch (error) {
        res.json({ error: "Not working" });
    }
});
exports.updatedTicket = updatedTicket;
//# sourceMappingURL=controller.js.map