// TODO Maybe this is not needed in the app
import express from "express";

import { deleteUser, getAllUsers, updateUser } from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares/auth";
import { ROUTES } from "consts";

export default (router: express.Router) => {
  // TODO fix any
  router.get(`${ROUTES.USERS}`, isAuthenticated as any, getAllUsers as any);
  router.delete(
    `${ROUTES.USERS}/:id`,
    isAuthenticated as any,
    isOwner as any,
    deleteUser as any
  );
  router.patch(
    `${ROUTES.USERS}/:id`,
    isAuthenticated as any,
    updateUser as any
  );
};
