import catchAsyncError from "../utils/catchAsyncError.js";
import { City } from "../models/cities.js";
export const searchResult = catchAsyncError(async (req, res, next) => {
  const { q, limit } = req.query;
  if (q.length < 1) {
    res.status(400).json({
      success: false,
      message: "Query too short",
    });
  } else {
    const result = await City.find({
      name: { $regex: q, $options: "i" },
    })
      .populate({
        path: "state",
        select: "name",
      })
      .select("name countryCode")
      .sort({ name: 1 })
      .limit(+limit);

    res.status(200).json({
      success: true,
      result,
    });
  }
});
