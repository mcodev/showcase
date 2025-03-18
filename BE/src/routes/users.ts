// TODO Maybe this is not needed in the app
import express from "express";

import { deleteUser, getAllUsers, updateUser } from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares/auth";
import { ROUTES } from "../consts";

export default (router: express.Router) => {
  router.get(`${ROUTES.USERS}`, isAuthenticated, getAllUsers);
  router.delete(`${ROUTES.USERS}/:id`, isAuthenticated, isOwner, deleteUser);
  router.patch(`${ROUTES.USERS}/:id`, isAuthenticated, updateUser);
};
