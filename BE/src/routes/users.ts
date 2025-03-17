// TODO Maybe this is not needed in the app
import express from "express";

import { deleteUser, getAllUsers } from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares/auth";

export default (router: express.Router) => {
  // TODO fix any
  router.get("/users", isAuthenticated as any, getAllUsers as any);
  router.delete("/users/:id", isOwner as any, deleteUser as any);
};
