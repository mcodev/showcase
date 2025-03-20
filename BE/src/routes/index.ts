import express from "express";
import authentication from "./authentication";
import refresh from "./refresh";
// import users from "./users";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  refresh(router);
  // users(router);

  return router;
};
