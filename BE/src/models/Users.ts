import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetCode: {
    type: String,
    required: false,
  },
  resetCodeExpiry: {
    type: Date,
    required: false,
  },
});

const UserModel = mongoose.model("User", userSchema);

export const getUserByEmail = (email: string) => {
  try {
    return UserModel.findOne({ email });
  } catch (error) {
    return null;
  }
};

export const createUser = async (values: Record<string, any>) => {
  try {
    const user = await new UserModel(values).save();
    return user.toObject();
  } catch (error) {
    return null;
  }
};

export const updateUser = async (id: string, values: Record<string, any>) => {
  try {
    const user = await UserModel.findOneAndUpdate({ _id: id }, values, {
      new: true,
    });

    return user.toObject();
  } catch (error) {
    throw false;
  }
};
