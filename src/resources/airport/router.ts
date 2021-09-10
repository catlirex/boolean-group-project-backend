import { Router } from "express";
import { getAllAirports } from "./controller";

const router = Router();

router.get("/", getAllAirports);
export default router
