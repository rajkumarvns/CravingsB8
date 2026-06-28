import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import connectDB from "./src/config/dbconnection.config.js";
import authRouter from "./src/router/auth.route.js";
import publicRouter from "./src/router/public.route.js";

const app = express();

app.use(cors({origin:"http://localhost:5173"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("Default Get API Hit");
  res.json({ message: "welcome to my Cravings project" });
});

app.use("/auth", authRouter);
app.use("/", publicRouter);

app.use((err, req, res, next) => {
  const ErrMessage = err.message || "Internal server error";
  const ErrstatusCode = err.statusCode || 500;
  res.status(ErrstatusCode).json({ message: ErrMessage });
});

const port = Number((process.env.PORT || "4500").replace(/;$/, "")) || 4500;
app.listen(port, () => {
  console.log("server started on port", port);
  connectDB();
});
