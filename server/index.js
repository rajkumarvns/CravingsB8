import dotenv from "dotenv";
dotenv.config();
import express from "express";

import connectDB from "./src/config/dbConnection.config.js";
const app = express();

//default API
app.get("/", (req, res) => {
  console.log("Default Get API Hit");
  res.json({ message: "welcome to my Cravings project" });
});
// Default error message
app.use((err, req, res, next) => {
  const ErrMessage = err.message || "Internal server error";
  const ErrstatusCode = err.statusCode || 500;
  res.status(ErrstatusCode).json({ message: ErrMessage });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server started on port", port);
  connectDB();
});
