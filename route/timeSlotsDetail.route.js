import express from "express";
import { addEditTimeSlotsDetail, getAllTimeSlotsDetail } from "../controller/timeSlotsDetail.controller.js";

const router = express.Router();

// POST → Add or Update 
router.post("/save", addEditTimeSlotsDetail);
router.get("/getAll", getAllTimeSlotsDetail);

export default router;