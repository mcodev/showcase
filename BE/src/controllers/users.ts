import express from "express";
import { deleteUserById, getUserById, getUsers } from "../models/Users";
import { response } from "../common";
import { ROUTES_NAMES } from "../consts";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    response({
      res,
      statusCode: 200,
      payload: { users },
    }).end();
  } catch (error) {
    console.log(error);

    response({
      res,
      statusCode: 500,
    });
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    if (!user) {
      response({ res, statusCode: 404, route: ROUTES_NAMES.USERS });
      return;
    }

    await deleteUserById(id);

    response({
      res,
      statusCode: 200,
      route: ROUTES_NAMES.USERS,
      customMessage: "USER_DELETED",
    }).end();
  } catch (error) {
    console.log(error);

    response({
      res,
      statusCode: 500,
    });
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    if (!user) {
      response({ res, statusCode: 404, route: ROUTES_NAMES.USERS });

      return;
    }

    const {
      name,
      // email
    } = req.body;

    if (!name) {
      response({ res, statusCode: 400, route: ROUTES_NAMES.USERS });

      return;
    }

    // if (!email) {
    //   return res.status(400).json({ success: false, error: "Missing fields" });
    // }

    // if (email) {
    //   user.email = email;
    // }

    if (name) {
      user.name = name;
    }

    await user.save();

    response({
      res,
      statusCode: 200,
      route: ROUTES_NAMES.USERS,
      payload: { user },
    }).end();
  } catch (error) {
    console.log(error);

    response({
      res,
      statusCode: 500,
    });
  }
};
