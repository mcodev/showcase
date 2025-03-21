import mongoose from "mongoose";

const RefreshTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);
