import { Router } from "express";
import { getTicketById, updatedTicket, getAllTickets } from "./controller";

const router = Router();

router.get("/:id", getTicketById)
router.get("/", getAllTickets)
router.patch("/:id", updatedTicket)

export default router
