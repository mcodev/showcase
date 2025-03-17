// TODO Maybe this is not needed in the app
import express from "express";

import { getAllUsers } from "../controllers/users";
import { isAuthenticated } from "../middlewares/auth";

export default (router: express.Router) => {
  // TODO fix any
  router.get("/users", isAuthenticated as any, getAllUsers as any);
};
