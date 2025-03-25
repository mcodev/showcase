import express from "express";
import AUTHENTICATION from "../controllers/authentication";
import { ROUTES } from "../consts";
import { isAuthenticated } from "../middlewares/auth";

export default (router: express.Router) => {
  router.post(`${ROUTES.AUTH}/register`, AUTHENTICATION.REGISTER);
  router.post(`${ROUTES.AUTH}/login`, AUTHENTICATION.LOGIN);
  router.post(`${ROUTES.AUTH}/logout`, isAuthenticated, AUTHENTICATION.LOGOUT);
  router.post(
    `${ROUTES.AUTH}/request_password_reset`,
    AUTHENTICATION.REQUEST_PASSWORD_RESET
  );
  // router.post(`${ROUTES.AUTH}/reset_password`, reset_password);
};
