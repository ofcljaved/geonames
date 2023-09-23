import path from "path";
import { readFile } from "fs/promises";
import catchAsyncError from "../utils/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { State } from "../models/states.js";
import { Country } from "../models/countries.js";

const __dirname = path.resolve();

export const getStates = catchAsyncError(async (req, res, next) => {
  const states = await State.find({}).exec();
  res.status(200).json({
    success: true,
    states,
  });
});

export const getUniqueState = catchAsyncError(async (req, res, next) => {
  const { isoCode, countryCode } = req.body;
  const state = await State.find({
    isoCode,
    countryCode,
  }).exec();

  if (!state) return next(new ErrorHandler("State doesn't exist", 400));

  res.status(200).json({
    success: true,
    state,
  });
});

export const insertState = catchAsyncError(async (req, res, next) => {
  const stateJson = await readFile(
    path.join(__dirname, "/assets/state.json"),
    "utf-8"
  );
  const stateData = JSON.parse(stateJson);

  const statePromise = await stateData.map(async (state) => {
    const country = await Country.findOne({
      isoCode: state.countryCode,
    }).exec();
    const stateExist = await State.find({
      isoCode: state.isoCode,
      country: country._id,
    });
    if (stateExist) return next(new ErrorHandler("State already exists", 400));
    const result = await State.create({
      name: state.name,
      isoCode: state.isoCode,
      countryCode: state.countryCode,
      country: country._id,
      latitude: Number(state.latitude),
      longitude: Number(state.longitude),
    });
    return result;
  });
  const stateDoc = await Promise.all(statePromise);
  if (stateDoc.length === 0)
    return next(new ErrorHandler("Internal Server error", 501));

  res.status(200).json({
    success: true,
    message: "State Data inserted succesfully",
    stateDoc,
  });
});
