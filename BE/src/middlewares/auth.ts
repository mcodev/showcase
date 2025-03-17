import express from "express";
import { getUserBySessionToken } from "../models/Users";
import { merge } from "lodash";

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

// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// exports.protect = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ success: false, msg: "Not authorized" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id);
//     next();
//   } catch (err) {
//     res.status(401).json({ success: false, msg: "Not authorized" });
//   }
// };
