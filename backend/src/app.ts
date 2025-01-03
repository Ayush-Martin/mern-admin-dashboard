import express, { NextFunction } from "express";
import { config } from "dotenv";
import connectDb from "./configs/dbConfig.js";
import errorHandler from "./Middlewares/errorHandler.js";
import cors from "./configs/corsConfig.js";
import cookieParser from "cookie-parser";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//routers
import authRouter from "./routers/authRouter.js";
import profileRouter from "./routers/profileRouter.js";
import adminRouter from "./routers/adminRouter.js";
import { checkUserAuthenticated } from "./Middlewares/userAuth.js";
import { fileURLToPath } from "url";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(cors);
config();

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/admin", adminRouter);
app.use(errorHandler);
connectDb();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`backend is running on port ${PORT}`);
});
