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
exports.getOneBookingDetail = exports.getBookingForOneUser = void 0;
const database_1 = __importDefault(require("../../utils/database"));
const { booking } = database_1.default;
const getBookingForOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.userId);
    try {
        const bookings = yield booking.findMany({
            where: { userId: id },
            include: {
                BookExtraLuggage: { include: { ExtraLuggage: true } },
                tickets: {
                    include: { scheduledFlight: { include: { flightNumber: true } } },
                },
            },
        });
        res.json(bookings);
    }
    catch (error) {
        console.log(error);
        res.json({ error: "user id incorrect" });
    }
});
exports.getBookingForOneUser = getBookingForOneUser;
const getOneBookingDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const bookings = yield booking.findMany({
            where: { id },
            include: {
                BookExtraLuggage: { include: { ExtraLuggage: true } },
                tickets: {
                    include: { scheduledFlight: { include: { flightNumber: true } } },
                },
            },
        });
        res.json(bookings);
    }
    catch (error) {
        console.log(error);
        res.json({ error: "booking id incorrect" });
    }
});
exports.getOneBookingDetail = getOneBookingDetail;
//# sourceMappingURL=conroller.js.map