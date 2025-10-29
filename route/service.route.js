import express from "express";
import { addEditServices, getAllServices } from "../controller/service.controller.js";

const router = express.Router();

// POST → Add or Update 
router.post("/save", addEditServices);
router.get("/getAll", getAllServices);

export default router;