import mongoose from "mongoose";

const RefreshTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);

export const createToken = async (userId: string, token: string) => {
  const refreshToken = await RefreshToken.create({
    userId: userId,
    token: token,
  });

  if (!refreshToken) {
    return false;
  }

  return true;
};

export const getToken = async (token: string) => {
  return await RefreshToken.findOne({ token: token });
};

export const deleteToken = async (token: string) => {
  const result = await RefreshToken.deleteOne({ token: token });

  if (result.deletedCount === 0) {
    return false;
  }

  return true;
};
