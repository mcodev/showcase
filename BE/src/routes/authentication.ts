import express from "express";
import { login, register } from "../controllers/authentication";
import { ROUTES } from "../consts";

export default (router: express.Router) => {
  //  TODO fix any
  router.post(`${ROUTES.AUTH}/register`, register as any);
  router.post(`${ROUTES.AUTH}/login`, login as any);
};
