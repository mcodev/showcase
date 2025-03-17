import express from "express";
import { getUserBySessionToken } from "../models/Users";
import { get, merge } from "lodash";
import { response } from "../common";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["APP-AUTH"];

    if (!sessionToken) {
      return response({ res, statusCode: 403 });
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return response({ res, statusCode: 403 });
    }

    merge(req, {
      identity: existingUser,
    });

    return next();
  } catch (error) {
    console.log(error);
    return response({ res, statusCode: 403 });
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

    if (!currentUserId) {
      return response({ res, statusCode: 403 });
    }

    if (currentUserId.toString() !== id) {
      return response({ res, statusCode: 403 });
    }

    return next();
  } catch (error) {
    console.log(error);
    return response({ res, statusCode: 403 });
  }
};
