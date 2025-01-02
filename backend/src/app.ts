import express, { NextFunction } from "express";
import { config } from "dotenv";
import connectDb from "./configs/dbConfig.js";
import errorHandler from "./Middlewares/errorHandler.js";
import cors from "./configs/corsConfig.js";
import cookieParser from "cookie-parser";

//routers
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouters.js";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors);
config();

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use(errorHandler);
connectDb();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`backend is running on port ${PORT}`);
});
