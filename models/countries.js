import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: { type: String },
  isoCode: { type: String },
  flag: { type: String },
  phonecode: { type: mongoose.Schema.Types.Number },
  currency: { type: String },
  latitude: { type: mongoose.Schema.Types.Number },
  longitude: { type: mongoose.Schema.Types.Number },
  timezones: [
    {
      zoneName: { type: String },
      gmtOffset: { type: mongoose.Schema.Types.Number },
      gmtOffsetName: { type: String },
      abbreviation: { type: String },
      tzName: { type: String },
    },
  ],
});

export const Country = mongoose.model("Country", schema);
