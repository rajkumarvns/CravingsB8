import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const UserData = [
  {
    fullName: "Manager1",
    email: "Manager1@gmail.com",
    password: await bcrypt.hash("Manager@123", 10),
    dob: "2000-01-01",
    gender: "other",
    userType: "restaurant",
    phone: "9999988888",
    photo: { url: "https://placehold.co/600x400?text=M", publicId: null },
  },
  {
    fullName: "Customer1",
    email: "Customer1@gmail.com",
    password: await bcrypt.hash("Customer@123", 10),
    dob: "2000-02-02",
    gender: "other",
    userType: "customer",
    phone: "7777788888",
    photo: { url: "https://placehold.co/600x400?text=C", publicId: null },
  },
  {
    fullName: "Rider1",
    email: "rider1@gmail.com",
    password: await bcrypt.hash("Rider@123", 10),
    gender: "other",
    userType: "Rider",
    phone: "5555555555",
    photo: { url: "https://placehold.co/600x400?text=R", publicId: null },
  },
];
const userSeed = async () => {
  try {
    const existingRestaurant = await User.findOne({ email: UserData[0].email });
    if (existingRestaurant) {
      console.log("existing restaurant found");
      console.log("deleting existing restaurant");
      await existingRestaurant.deleteOne();
    }
    const newRestaurant = await User.create(UserData[0]);
    console.log("restaurant created successfully");
    const existingCustomer = await User.findOne({ email: UserData[1].email });
    if (existingCustomer) {
      console.log("existing customer found");
      console.log("delete existing customer");
      await existingCustomer.deleteOne();
    }
    console.log("create new customer");
    const newCustomer = await User.create(UserData[1]);
    //seeding rider
    const existingRider = await User.findOne({ email: UserData[2].email });
    if (existingRider) {
      console.log("existing rider found");
      console.log("delete existing rider");
      await existingRider.deleteOne();
    }
    console.log("create new rider");
    const newRider = await User.findOne({ email: UserData[2].email });
    console.log("Rider created successfully");
  } catch (error) {
    throw error;
  }
};
export default userSeed;
