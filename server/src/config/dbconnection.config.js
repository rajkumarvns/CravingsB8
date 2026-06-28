import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = (process.env.MONGO_DB_URI || "mongodb://localhost:27017/cravingsB8_DB").replace(/;$/, "");
    const conn = await mongoose.connect(mongoUri);
    console.log("Mongo DB connected successfully");
    console.log("DB Host :", conn.connection.host);
    console.log("DB Name :", conn.connection.name);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
export default connectDB;
