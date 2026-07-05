import express from "express";
import dotenv from "dotenv";
import "./src/config/Coundinary.config.js";
import cors from "cors";
import morgan from "morgan";

import connectDB from "./src/config/dbconnection.config.js";
import AuthRouter from "./src/router/auth.route.js";
import PublicRouter from "./src/router/public.route.js";
import UserRouter from "./src/router/user.route.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(express.json());
app.use("/auth", AuthRouter);
app.use("/public", PublicRouter);
app.use("/user", UserRouter);

// default API
app.get("/", (req, res) => {
  console.log("Default Get API Hit");
  res.json({ message: "welcome to my Cravings project" });
});

// default error handler
app.use((err, req, res, next) => {
  const ErrMessage = err.message || "Internal server error";
  const ErrstatusCode = err.statusCode || 500;
  res.status(ErrstatusCode).json({ message: ErrMessage });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server started on port", port);
  connectDB();
  // try {
  //   const result = await cloudinary.api.ping();
  //   console.log("Cloudinary Connected:");

  //   console.log(result);

  // } catch (error) {
  //   console.log(error.message);
  //   process.exit(1);
  // }
});
