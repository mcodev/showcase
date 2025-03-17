import express from "express";
import { createUser, getUserByEmail } from "../models/Users";
import { random, authentication } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.status(400).json({ success: false, error: "User not found" });
    }

    const expectedHashedPassword = authentication(
      user.authentication.salt,
      password
    );

    if (user.authentication.password !== expectedHashedPassword) {
      return res
        .status(403)
        .json({ success: false, error: "Invalid credentials" });
    }

    const salt = random();

    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie("APP-AUTH", user.authentication.sessionToken, {
      //   domain: "localhost",
      //   path: "/",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    //TODO send whole user if needed
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    res.status(200).json({ success: true, userData }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

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

    const user = await createUser({
      name,
      email,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    res.status(201).json({ success: true, user }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
