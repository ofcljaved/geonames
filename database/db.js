import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "geonames",
    });
    console.log(`Databse is connected with ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
