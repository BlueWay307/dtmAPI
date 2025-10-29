import express from "express";
import { addEditIVDrips, getAllIVDrips } from "../controller/ivDrip.controller.js";

const router = express.Router();

router.post("/save", addEditIVDrips);
router.get("/getAll", getAllIVDrips);

export default router;