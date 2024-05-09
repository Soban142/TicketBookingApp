import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./configs/dbConfig.js";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8800;
connectDB();

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/hotels", hotelRouter);
app.use("/api/v1/rooms", roomRouter);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";

  res.status(status).json({
    success: false,
    status,
    message,
    stack: err.stack,
  });
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () =>
    console.log("Listening to requests at http://localhost/8800")
  );
});
