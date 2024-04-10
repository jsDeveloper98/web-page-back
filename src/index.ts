import cors from "cors";
import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./config";
import { authRoute, productRoute } from "./routes";

config();

const corsOptions = {
  origin: "http://localhost:3000", // Update with your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

const app = express();

// Enable CORS for all routes
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api", authRoute);
app.use("/api", productRoute);

connectDB(app);
