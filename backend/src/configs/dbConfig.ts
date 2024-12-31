import { connect } from "mongoose";
import { config } from "dotenv";
config();
const URI = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    if (!URI) {
      throw new Error("mongodb connection string is undefined");
    }

    await connect(URI);
    console.log("mongodb is connected");
  } catch (err) {
    console.log("mongodb error :", err);
  }
};

export default connectDb;
