import express from "express";
import { createUser, getUserByEmail } from "../models/Users";
import { hashPassword, random } from "../helpers";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    const isUserAlreadyRegistered = await getUserByEmail(email);

    if (isUserAlreadyRegistered) {
      return res
        .status(400)
        .json({ success: false, error: "User already registered" });
    }

    const salt = random();
    const hashedPassword = await hashPassword(password);

    const user = await createUser({
      name,
      email,
      authentication: {
        password: hashedPassword,
        salt,
      },
    });

    res.status(201).json({ success: true, user }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
