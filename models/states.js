import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: { type: String, required: true },
  isoCode: { type: String, required: true },
  countryCode: { type: String, required: true },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
    required: true,
  },
  latitude: { type: mongoose.Schema.Types.Number, required: true },
  longitude: { type: mongoose.Schema.Types.Number, required: true },
});

export const State = mongoose.model("State", schema);
