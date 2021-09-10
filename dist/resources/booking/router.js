"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.get("/user/:userId", controller_1.getBookingForOneUser);
router.get("/:id", controller_1.getOneBookingDetail);
router.delete("/:id", controller_1.delOneBooking);
router.post("/", controller_1.createBooking);
exports.default = router;
//# sourceMappingURL=router.js.map