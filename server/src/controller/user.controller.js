import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
export const EditUserProfile = async (req, res, next) => {
  try {
    const { email, fullName, phone } = req.body;
    const currentUserId = req.user?._id || req.body.userId || req.body.User;
    if (!email || !fullName || !phone) {
      const error = new Error("All fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findById(currentUserId);
    if (!existingUser) {
      const error = new Error("Email not registred");
      error.statusCode = 404;
      return next(error);
    }
    if (req.file) {
      existingUser?.photo?.public_id &&
        (await cloudinary.uploader.destroy(existingUser.photo.public_id));
      const newPhoto = req.file;
      const b64 = Buffer.from(newPhoto.buffer).toString("base64");
      const dataURI = `data:${newPhoto.mimetype};base64,${b64}`;
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "CravingsFSD8/profile",
        transformation: { width: 500, height: 500, crop: "fill" },
      });
      if (result && result.secure_url) {
        existingUser.photo = {
          url: result.secure_url,
          public_id: result.public_id,
        };
      }
    }

    existingUser.fullName = fullName;
    existingUser.phone = phone;

    await existingUser.save();

    res
      .status(200)
      .json({ message: "User Updated Sucessfully", data: existingUser });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
