import mongoose from "mongoose";
import { config } from "dotenv";
import { Application } from "express";

config();

const { PORT, MONGO_URI } = process.env;

const connectDatabase = async (): Promise<typeof mongoose> => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(MONGO_URI as string);
};

export const connectDB = (app: Application) => {
  try {
    connectDatabase().then(() => {
      app.listen(PORT, () => {
        console.log(`App is Running on http://localhost:${PORT}`);
      });
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(`Server error: ${err.message}`);
    }
  }
};
