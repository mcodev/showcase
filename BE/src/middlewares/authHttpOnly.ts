import express from "express";
import { getUserBySessionToken } from "../models/Users";
import { get, merge } from "lodash";
import { response } from "../helpers/response";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["APP-AUTH"];

    if (!sessionToken) {
      response({ res, statusCode: 403 });
      return;
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      response({ res, statusCode: 403 });
      return;
    }

    merge(req, {
      identity: existingUser,
    });

    next();
  } catch (error) {
    console.log(error);
    response({ res, statusCode: 403 });
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
      response({ res, statusCode: 403 });
      return;
    }

    if (currentUserId.toString() !== id) {
      response({ res, statusCode: 403 });
      return;
    }

    next();
  } catch (error) {
    console.log(error);
    response({ res, statusCode: 403 });
  }
};
