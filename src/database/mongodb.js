import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connection = async () => {
  await mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log(" 🟢 Connection Database Successfull");
    })
    .catch((err) => {
      console.error(" 🔴 Database connection error", err);
    });
};

export const disconnect = async () => mongoose.connection.close();
