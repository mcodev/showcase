import express from "express";
import { deleteUserById, getUserById, getUsers } from "../models/Users";

//TODO Maybe this is not needed in the app
export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    await deleteUserById(id);

    return res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const {
      name,
      // email
    } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    // if (!email) {
    //   return res.status(400).json({ success: false, error: "Missing fields" });
    // }

    // if (email) {
    //   user.email = email;
    // }

    if (name) {
      user.name = name;
    }

    await user.save();

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
