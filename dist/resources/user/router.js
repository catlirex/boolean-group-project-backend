"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.delete("/:id", controller_1.deleteUserById);
exports.default = router;
//# sourceMappingURL=router.js.map