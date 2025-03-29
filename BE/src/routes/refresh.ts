import express from "express";
import { ROUTES } from "../consts";
import refresh from "../controllers/refresh";

export default (router: express.Router) => {
  router.post(`${ROUTES.REFRESH}`, refresh);
};
