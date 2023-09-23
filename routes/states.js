import express from "express";
import {
  getStates,
  getUniqueState,
  insertState,
} from "../controllers/states.js";

const router = express.Router();

router.get("/", getStates);
router.post("/unique", getUniqueState);
router.get("/insert", insertState);

export default router;
