import { Router } from "express";
import {
  getBookingForOneUser,
  getOneBookingDetail,
  delOneBooking,
  createBooking,
} from "./controller";

const router = Router();

router.get("/user/:userId", getBookingForOneUser);
router.get("/:id", getOneBookingDetail);
router.delete("/:id", delOneBooking);
router.post("/", createBooking);

export default router;
