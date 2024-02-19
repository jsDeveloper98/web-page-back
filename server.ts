import cors from "cors";
import express from "express";
import { config } from "dotenv";

import { authRoute } from "./routes";
import { connectDB } from "./config";

config();

const app = express();

app.use(cors());
app.use(express.json());
// app.use("/uploads", express.static("uploads"));

app.use(authRoute);
// app.use(userRoute);
// app.use(announcementsRoute);

connectDB(app);
