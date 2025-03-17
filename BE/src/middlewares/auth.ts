import express from "express";
import { getUserBySessionToken } from "../models/Users";
import { get, merge } from "lodash";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["APP-AUTH"];

    if (!sessionToken) {
      return res.status(403).json({ success: false, msg: "Not authorized" });
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.status(403).json({ success: false, msg: "Not authorized" });
    }

    merge(req, {
      identity: existingUser,
    });

    return next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, msg: "Not authorized" });
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;

    const currentUserId = get(req, "identity._id") as string;

    if (currentUserId !== id) {
      return res.status(403).json({ success: false, msg: "Not authorized" });
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, msg: "Not authorized" });
  }
};
