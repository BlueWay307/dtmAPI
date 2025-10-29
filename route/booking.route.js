import express from "express";
import { addEditBooking, getAllBooking } from "../controller/booking.controller.js";

const router = express.Router();

// POST → Add or Update 
router.post("/save", addEditBooking);
router.get("/getAll", getAllBooking);

export default router;