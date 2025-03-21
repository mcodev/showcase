import express from "express";
import { createUser, getUserByEmail } from "../models/Users";
import { random, authentication } from "../helpers";
import { response } from "../common";
import { ROUTES_NAMES } from "../consts";
import { RefreshToken } from "../models/RefreshToken";
import { generateAccessToken, generateRefreshToken } from "../helpers/tokens";

// LOGIN CONTROLLER
export const login = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      response({
        res,
        statusCode: 400,
        route: ROUTES_NAMES.AUTH,
      });
      return;
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      response({
        res,
        statusCode: 404,
        route: ROUTES_NAMES.AUTH,
      });
      return;
    }

    const expectedHashedPassword = authentication(
      user.authentication.salt,
      password
    );

    if (user.authentication.password !== expectedHashedPassword) {
      response({
        res,
        statusCode: 403,
        route: ROUTES_NAMES.AUTH,
      });
      return;
    }

    // Generate JWT tokens
    const accessToken = generateAccessToken(String(user._id));
    const refreshToken = await generateRefreshToken(String(user._id));

    response({
      res,
      statusCode: 200,
      route: ROUTES_NAMES.AUTH,
      payload: {
        accessToken,
        refreshToken,
        user: { _id: user._id, name: user.name },
      },
    }).end();
  } catch (error) {
    console.error(error);
    response({
      res,
      statusCode: 500,
      route: ROUTES_NAMES.AUTH,
    });
  }
};

// REGISTER CONTROLLER
export const register = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      response({
        res,
        statusCode: 400,
        route: ROUTES_NAMES.AUTH,
      });
      return;
    }

    const isUserAlreadyRegistered = await getUserByEmail(email);

    if (isUserAlreadyRegistered) {
      response({
        res,
        statusCode: 409,
        route: ROUTES_NAMES.AUTH,
      });
      return;
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

    if (!user) {
      response({
        res,
        statusCode: 500,
        route: ROUTES_NAMES.AUTH,
        // message: "User registration failed",
      });
      return;
    }

    // Generate JWT tokens
    const accessToken = generateAccessToken(String(user._id));
    const refreshToken = await generateRefreshToken(String(user._id));

    if (!accessToken || !refreshToken) {
      response({
        res,
        statusCode: 500,
        route: ROUTES_NAMES.AUTH,
        // message: "User registration failed",
      });
      return;
    }

    response({
      res,
      statusCode: 201,
      route: ROUTES_NAMES.AUTH,
      payload: { accessToken, refreshToken, user },
    }).end();
  } catch (error) {
    console.error(error);
    response({
      res,
      statusCode: 500,
      route: ROUTES_NAMES.AUTH,
    });
  }
};

// LOGOUT CONTROLLER
export const logout = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { refreshToken } = req.body;

  // Delete refresh token from DB
  const deletedToken = await RefreshToken.deleteOne({
    token: refreshToken,
  });

  if (!deletedToken) {
    response({
      res,
      statusCode: 404,
      route: ROUTES_NAMES.AUTH,
      // message: "Refresh token not found",
    });
    return;
  }

  response({
    res,
    statusCode: 200,
    route: ROUTES_NAMES.AUTH,
    // message: "Logged out successfully",
  }).end();
};
