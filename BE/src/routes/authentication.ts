import express from "express";
import { register } from "../controllers/authentication";

export default (router: express.Router) => {
  //  TODO fix any
  router.post("/auth/register", register as any);
};
