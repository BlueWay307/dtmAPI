import express from "express";
import { addEditContactUs, getAllContactUs } from "../controller/contactUs.controller.js";

const router = express.Router();

// POST → Add or Update 
router.post("/save", addEditContactUs);
router.get("/getAll", getAllContactUs);

export default router;