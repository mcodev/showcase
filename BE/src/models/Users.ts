import mongoose from "mongoose";

const useColorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  authentication: {
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,
      select: false,
    },
    sessionToken: {
      type: String,
      select: false,
    },
  },
});

export const UserModel = mongoose.model("User", useColorSchema);

export const getUsers = async () => {
  return await UserModel.find();
};

export const getUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email });
};

export const getUserBySessionToken = async (sessionToken: string) => {
  return await UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });
};

export const getUserById = async (id: string) => {
  return await UserModel.findById(id);
};

export const createUser = async (values: Record<string, any>) => {
  new UserModel(values).save().then((user) => {
    user.toObject();
  });
};

export const deleteUserById = async (id: string) => {
  return await UserModel.findByIdAndDelete(id);
};

export const updateUserById = async (
  id: string,
  values: Record<string, any>
) => {
  return await UserModel.findByIdAndUpdate(id, values);
};

// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     unique: true,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// module.exports = mongoose.model("User", UserSchema);
