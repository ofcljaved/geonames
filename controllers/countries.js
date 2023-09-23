import { Country } from "../models/countries.js";
import catchAsyncError from "../utils/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getCountries = catchAsyncError(async (req, res, next) => {
  const countries = await Country.find({}).exec();
  res.status(200).json({
    success: true,
    countries,
  });
});

export const getUniqueCountry = catchAsyncError(async (req, res, next) => {
  const { isoCode } = req.body;
  const country = await Country.find({
    isoCode,
  });
  if (!country) return next(new ErrorHandler("Invalid Country code", 400));
  res.status(200).json({
    success: true,
    country,
  });
});
