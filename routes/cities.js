import express from "express";
import {
  getCities,
  getUniqueCities,
  insertCities,
} from "../controllers/cities.js";

const router = express.Router();

router.get("/", getCities);
router.post("/unique", getUniqueCities);
router.get("/insert", insertCities);

export default router;
