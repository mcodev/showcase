import express from "express";
import { createUser, getUserByEmail } from "../../models/Users";
import { random, authentication } from "../../helpers/functions";
import { response } from "../../common";
import { ROUTES_NAMES } from "../../consts";

export const login = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // TODO check fields with validators

    if (!email || !password) {
      response({ res, statusCode: 400, route: ROUTES_NAMES.AUTH });
      return;
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      response({ res, statusCode: 404, route: ROUTES_NAMES.AUTH });
      return;
    }

    const expectedHashedPassword = authentication(
      user.authentication.salt,
      password
    );

    if (user.authentication.password !== expectedHashedPassword) {
      response({ res, statusCode: 403, route: ROUTES_NAMES.AUTH });
      return;
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

    const userData = {
      _id: user._id,
      name: user.name,
    };

    response({
      res,
      statusCode: 200,
      route: "AUTH",
      payload: userData,
    }).end();
  } catch (error) {
    console.log(error);
    response({ res, statusCode: 500, route: ROUTES_NAMES.AUTH });
  }
};

export const register = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      response({ res, statusCode: 400, route: ROUTES_NAMES.AUTH });
      return;
    }

    const isUserAlreadyRegistered = await getUserByEmail(email);

    if (isUserAlreadyRegistered) {
      response({ res, statusCode: 409, route: ROUTES_NAMES.AUTH });
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

    response({
      res,
      statusCode: 201,
      route: ROUTES_NAMES.AUTH,
      payload: { user },
    }).end();
  } catch (error) {
    console.log(error);
    response({ res, statusCode: 500, route: ROUTES_NAMES.AUTH });
  }
};
