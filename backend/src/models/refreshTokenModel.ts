import { Schema, model } from "mongoose";

const RefreshTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
});

const RefreshToken = model("refreshTokens", RefreshTokenSchema);

export default RefreshToken;
