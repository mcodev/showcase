import express from "express";
import authentication from "./authentication";
import refresh from "./refresh";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  refresh(router);

  return router;
};
