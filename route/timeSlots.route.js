import express from "express";
import { addEditTimeSlots, getAllTimeSlots } from "../controller/timeSlots.controller.js";

const router = express.Router();

// POST → Add or Update 
router.post("/save", addEditTimeSlots);
router.get("/getAll", getAllTimeSlots);

export default router;