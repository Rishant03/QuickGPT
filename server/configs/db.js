// server/configs/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI not set in environment");
  }

  try {
    // Provide a short server selection timeout so failures surface quickly.
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB connected:", mongoose.connection.host, mongoose.connection.name);

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.once("disconnected", () => {
      console.warn("MongoDB disconnected");
    });
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    // rethrow so the process can handle it (server.js can exit)
    throw err;
  }
};

export default connectDB;
