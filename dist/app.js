"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const router_1 = __importDefault(require("./resources/airport/router"));
const router_2 = __importDefault(require("./resources/user/router"));
const router_3 = __importDefault(require("./resources/auth/router"));
const router_4 = __importDefault(require("./resources/scheduledFlight/router"));
const router_5 = __importDefault(require("./resources/booking/router"));
const router_6 = __importDefault(require("./resources/ticket/router"));
const cors_1 = __importDefault(require("cors"));
// App initialisation
const app = (0, express_1.default)();
// MiddleWares
app.use(logger("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((0, cors_1.default)());
// Auth
app.use(router_3.default);
// Airport
app.use("/airports", router_1.default);
//User
app.use("/users", router_2.default);
//Scheduled Flight
app.use("/scheduledFlight", router_4.default);
//Bookings
app.use("/bookings", router_5.default);
//Tickets
app.use("/tickets", router_6.default);
// Catch All
app.all("*", (req, res) => {
    res.json({ msg: "ok" });
});
module.exports = app;
//# sourceMappingURL=app.js.map