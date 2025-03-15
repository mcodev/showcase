import express from "express";
import { login, register } from "../controllers/authentication";

export default (router: express.Router) => {
  //  TODO fix any
  router.post("/auth/register", register as any);
  router.post("/auth/login", login as any);
};
