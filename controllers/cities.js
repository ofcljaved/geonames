import { readFile } from "fs/promises";
import path from "path";
import catchAsyncError from "../utils/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { City } from "../models/cities.js";
import { Country } from "../models/countries.js";
import { State } from "../models/states.js";

const __dirname = path.resolve();

export const getCities = catchAsyncError(async (req, res, next) => {
  const cities = await City.find({}).exec();
  res.status(200).json({
    success: true,
    cities,
  });
});

export const getUniqueCities = catchAsyncError(async (req, res, next) => {
  const { name, countryCode, stateCode } = req.body;

  const citiesPromise = await City.find({
    name,
    countryCode,
    stateCode,
  }).exec();

  const cities = await Promise.all(citiesPromise);

  if (!cities) return next(new ErrorHandler("City doesn't exists", 400));

  res.status(200).json({
    success: true,
    cities,
  });
});

export const insertCities = catchAsyncError(async (req, res, next) => {
  const cityJson = await readFile(
    path.join(__dirname, "/assets/city.json"),
    "utf-8"
  );
  const cityData = JSON.parse(cityJson);

  const cityPromise = await cityData.map(async (city) => {
    const cityExist = await City.findOne({
      name: city.name,
      countryCode: city.countryCode,
      stateCode: city.stateCode,
    }).exec();

    if (cityExist) return next(new ErrorHandler("City already exists"));

    const state = await State.findOne({
      isoCode: city.stateCode,
      countryCode: city.countryCode,
    }).exec();

    const result = await City.create({
      name: city.name,
      countryCode: city.countryCode,
      stateCode: city.stateCode,
      country: state.country,
      state: state._id,
      latitude: Number(city.latitude),
      longitude: Number(city.longitude),
    });
    return result;
  });

  const cityDoc = await Promise.all(cityPromise);
  if (cityDoc.length === 0)
    return next(new ErrorHandler("Internal Server error", 501));

  res.status(200).json({
    success: true,
    length: cityDoc.length,
    message: "Cities inserted successfully",
  });
});
