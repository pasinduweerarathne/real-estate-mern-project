import express, { json } from "express";
import path from "path";
import dotev from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import listingRouter from "./routes/listing.routes.js";

// configurations
dotev.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://real-estate-mern-app.netlify.app/",
    credentials: true,
  })
);
app.use(cookieParser());

const __dirname = path.resolve();

// routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// mongo db connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((error) => console.log(error));

app.listen(5000, () => {
  console.log("sever is running on http://localhost:5000");
});
