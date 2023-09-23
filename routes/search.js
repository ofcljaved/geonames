import express from "express";
import { searchResult } from "../controllers/search.js";

const router = express.Router();

router.get("/", searchResult);

export default router;
