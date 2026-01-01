import express from "express";
import mongoose from "mongoose";
import userRoute from "./route/userRouter.js";
import taskRoute from "./route/taskRouter.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/task", taskRoute);

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("DB connected Succesfully"))
  .catch((err) => console.log("Databse connection fail", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server is running on Port : ${PORT}`));
