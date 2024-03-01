import cors from "cors";
import express from "express";
import { config } from "dotenv";

import { connectDB } from "@/config";
import { authRoute, postRoute } from "@/routes";

config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api", authRoute);
app.use("/api", postRoute);

connectDB(app);
