import express from "express";
import { getCountries, getUniqueCountry } from "../controllers/countries.js";

const router = express.Router();
router.get("/", getCountries);
router.post("/unique", getUniqueCountry);

export default router;
