import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   })
// );

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());

// Routers

import adminUserRoute from "./routes/admin.routes.js";
import quizRoute from "./routes/quiz.routes.js";
import userRoute from "./routes/user.routes.js";
import { ApiError } from "./utils/ApiError.js";

app.use("/api/v1/user/admin", adminUserRoute);
app.use("/api/v1/quiz", quizRoute);
app.use("/api/v1/user", userRoute);

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
    });
  }

  return res.status(500).json({
    success: false,
    message: "An unexpected error occurred",
  });
});

export { app };
