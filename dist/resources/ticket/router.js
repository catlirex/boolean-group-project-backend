"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.get("/:id", controller_1.getTicketById);
router.get("/", controller_1.getAllTickets);
router.patch("/:id", controller_1.updatedTicket);
exports.default = router;
//# sourceMappingURL=router.js.map