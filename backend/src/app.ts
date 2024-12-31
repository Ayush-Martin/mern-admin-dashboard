import express, { NextFunction } from "express";
import { config } from "dotenv";
import connectDb from "./configs/dbConfig.js";
import errorHandler from "./Middlewares/errorHandler.js";
import cors from "./configs/corsConfig.js";

//routers
import authRouter from "./routers/authRouter.js";

const app = express();
app.use(express.json());
app.use(cors);
config();

app.use("/auth", authRouter);
app.use(errorHandler);
connectDb();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`backend is running on port ${PORT}`);
});
