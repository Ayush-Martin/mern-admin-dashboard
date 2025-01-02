import { model, Schema } from "mongoose";
import { UserType } from "../types/userTypes.js";

const UserSchema = new Schema<
  UserType & { isAdmin: boolean; profileImage: string; isBlocked: boolean }
>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  profileImage: {
    type: String,
    required: false,
    default: "",
  },
  isBlocked: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const User = model("user", UserSchema);

export default User;
