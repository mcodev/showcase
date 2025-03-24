import express from "express";
import { createUser, getUserByEmail, updateUserById } from "../models/Users";
import { random, authentication } from "../helpers";
import { response } from "../common";
import { ROUTES_NAMES } from "../consts";
import { RefreshToken } from "../models/RefreshToken";
import { generateAccessToken, generateRefreshToken } from "../helpers/tokens";
import {
  isValidEmail,
  isValidName,
  isValidPassword,
} from "../helpers/validators";

// LOGIN CONTROLLER
export const login = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const EMAIL = email?.trim();
    const PASSWORD = password?.trim();

    if (!email || !password) {
      response({
        res,
        statusCode: 400,
        route: ROUTES_NAMES.AUTH,
      });
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
    }

    const expectedHashedPassword = authentication(
      user.authentication.salt,
      PASSWORD
    );

    if (
      user.authentication.password !== expectedHashedPassword ||
      !isValidEmail(EMAIL) ||
      !isValidPassword(PASSWORD)
    ) {
      response({
        res,
        statusCode: 403,
        route: ROUTES_NAMES.AUTH,
      });
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

    const NAME = name?.trim();
    const EMAIL = email?.trim();
    const PASSWORD = password?.trim();

    if (!name || !email || !password) {
      response({
        res,
        statusCode: 400,
        route: ROUTES_NAMES.AUTH,
      });
    }

    if (
      !isValidName(NAME) ||
      !isValidEmail(EMAIL) ||
      !isValidPassword(PASSWORD)
    ) {
      response({
        res,
        statusCode: 403,
        route: ROUTES_NAMES.AUTH,
      });
    }

    const isUserAlreadyRegistered = await getUserByEmail(email);

    if (isUserAlreadyRegistered) {
      response({
        res,
        statusCode: 409,
        route: ROUTES_NAMES.AUTH,
      });
    }

    const salt = random();

    const user = await createUser({
      name: NAME,
      email: EMAIL,
      authentication: {
        salt,
        password: authentication(salt, PASSWORD),
      },
    });

    if (!user) {
      response({
        res,
        statusCode: 500,
      });
    }

    // Generate JWT tokens
    const accessToken = generateAccessToken(String(user._id));
    const refreshToken = await generateRefreshToken(String(user._id));

    if (!accessToken || !refreshToken) {
      response({
        res,
        statusCode: 500,
      });
    }

    response({
      res,
      statusCode: 201,
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
    });
  }
};

// LOGOUT CONTROLLER
export const logout = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    const deletedToken = await RefreshToken.deleteOne({
      token: refreshToken,
    });

    if (deletedToken.deletedCount === 0) {
      response({
        res,
        statusCode: 404,
        route: ROUTES_NAMES.AUTH,
        customMessage: "REFRESH_TOKEN_NOT_FOUND",
      });
    }

    response({
      res,
      statusCode: 200,
      route: ROUTES_NAMES.AUTH,
    }).end();
  } catch (error) {
    console.error(error);
    response({
      res,
      statusCode: 500,
    });
  }
};

export const forgot_password = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      response({
        res,
        statusCode: 400,
        route: ROUTES_NAMES.AUTH,
      });
    }

    const user = await getUserByEmail(email);

    if (!user) {
      response({
        res,
        statusCode: 404,
        route: ROUTES_NAMES.AUTH,
      });
    }

    // Generate JWT tokens
    const accessToken = generateAccessToken(String(user._id));
    const refreshToken = await generateRefreshToken(String(user._id));

    if (!accessToken || !refreshToken) {
      response({
        res,
        statusCode: 500,
      });
    }

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
    });
  }
};

export const reset_password = async (
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
    }

    const user = await getUserByEmail(email);

    if (!user) {
      response({
        res,
        statusCode: 404,
        route: ROUTES_NAMES.AUTH,
      });
    }

    const salt = random();

    const updatedUser = await updateUserById(user._id, {
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    if (!updatedUser) {
      response({
        res,
        statusCode: 500,
      });
    }

    response({
      res,
      statusCode: 200,
      route: ROUTES_NAMES.AUTH,
    }).end();
  } catch (error) {
    console.error(error);
    response({
      res,
      statusCode: 500,
    });
  }
};
