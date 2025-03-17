import express from "express";
import { createUser, getUserByEmail } from "../models/Users";
import { random, authentication } from "../helpers";
import { response } from "../common";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return response({ res, statusCode: 400, route: "AUTH" });
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return response({ res, statusCode: 404, route: "AUTH" });
    }

    const expectedHashedPassword = authentication(
      user.authentication.salt,
      password
    );

    if (user.authentication.password !== expectedHashedPassword) {
      return response({ res, statusCode: 403, route: "AUTH" });
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

    return response({
      res,
      statusCode: 200,
      route: "AUTH",
      payload: userData,
    }).end();
  } catch (error) {
    console.log(error);
    return response({ res, statusCode: 500, route: "AUTH" });
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return response({ res, statusCode: 400, route: "AUTH" });
    }

    const isUserAlreadyRegistered = await getUserByEmail(email);

    if (isUserAlreadyRegistered) {
      return response({ res, statusCode: 409, route: "AUTH" });
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

    return response({
      res,
      statusCode: 201,
      route: "AUTH",
      payload: { user },
    }).end();
  } catch (error) {
    console.log(error);
    return response({ res, statusCode: 500, route: "AUTH" });
  }
};
