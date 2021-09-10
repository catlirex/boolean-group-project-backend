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
exports.getAllAirports = void 0;
const database_1 = __importDefault(require("../../utils/database"));
const { airport } = database_1.default;
const getAllAirports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAirports = yield airport.findMany();
        res.json({ data: allAirports });
    }
    catch (error) {
        console.log(error);
        res.json({ error: "Not working" });
    }
});
exports.getAllAirports = getAllAirports;
//# sourceMappingURL=controller.js.map