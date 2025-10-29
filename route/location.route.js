import express from "express";
import { addEditLocation, getAllLocation } from "../controller/location.controller.js";

const router = express.Router();

// POST → Add or Update Location
router.post("/save", addEditLocation);
router.get("/getAll", getAllLocation);

export default router;
