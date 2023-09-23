import express from "express";
import { config } from "dotenv";
import cors from "cors";
import errorMiddleware from "./middlewares/error.js";
import cityRouter from "./routes/cities.js";
import stateRouter from "./routes/states.js";
import countryRouter from "./routes/countries.js";
import searchRouter from "./routes/search.js";

export const app = express();

config({
  path: "./database/config.env",
});

//Using middleware
app.use(express.json());
app.use(cors());

//Using routes
app.use("/api/v1/cities", cityRouter);
app.use("/api/v1/states", stateRouter);
app.use("/api/v1/countries", countryRouter);
app.use("/api/v1/search", searchRouter);

app.get("/", (req, res, next) => {
  res.json({
    success: true,
    message: "connection succesfull",
  });
});

//Using error middleware
app.use(errorMiddleware);
