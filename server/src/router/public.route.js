import express from "express";
import { ContactUsForm } from "../controller/public.controller.js";
const router = express.Router();

router.post("/contact-us", ContactUsForm);


export default router;
// router.post("/register", (req, res) => {
//   console.log("Register Route Hit");
//   res.json({
//     success: true,
//     message: "Register Route Working",
//   });
// });
