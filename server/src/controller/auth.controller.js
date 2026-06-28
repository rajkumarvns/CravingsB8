import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const RegisterUser = async (req, res, next) => {
  try {
    const fullName = req.body.fullName || req.body.fullname;
    const { email, password, phone, gender, dob } = req.body;

    if (!fullName || !email || !password || !phone || !gender || !dob) {
      const error = new Error("All fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("Email already registered");
      error.statusCode = 409;
      return next(error);
    }

    const photo = `https://placehold.co/600x400?text=${fullName.charAt(0).toUpperCase()}`;

    const SALT = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, SALT);

    await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      gender,
      dob,
      photo,
    });

    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const LoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("All fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("Email not registered");
      error.statusCode = 404;
      return next(error);
    }

    const isVerified = await bcrypt.compare(password, existingUser.password);
    if (!isVerified) {
      const error = new Error("Incorrect Password");
      error.statusCode = 401;
      return next(error);
    }

    res.status(200).json({
      message: "Welcome Back",
      data: existingUser,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const LogoutUser = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
