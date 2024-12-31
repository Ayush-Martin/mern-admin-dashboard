import express from "express";
import { config } from "dotenv";
import connectDb from "./configs/dbConfig.js";

const app = express();
app.use(express.json());
config();

connectDb();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`backend is running on port ${PORT}`);
});
