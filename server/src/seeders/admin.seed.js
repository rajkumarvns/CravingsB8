import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const AdminUser = {
  fullName: "Admin",
  email: "Admin@cravingsFSD08.com",
  password: await bcrypt.hash("StrongPassword@123", 10),
  dob: "2002-08-07",
  gender: "other",
  userType: "admin",
  phone: "9876543211",
  photo: { url: "https://placehold.co/600x400?text=Admin", publicId: null },
};
const adminSeed = async () => {
  try {
    const existingAdmin = await User.findOne({ email: AdminUser.email });
    if (existingAdmin) {
      console.log("Existing user found");
      console.log("Deleting existing user");
      await existingAdmin.deleteOne();
    }
    console.log("creating new admin");
    const newAdmin = await User.create(AdminUser);
  } catch (error) {
    console.log("Admin not created");
    throw error;
  }
};
export default adminSeed;
