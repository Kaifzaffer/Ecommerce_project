import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.name}`); // Improved logging
  } catch (error) {
    console.error(error); // Use console.error for error messages
    process.exit(1);
  }
};

export default connectDB;
