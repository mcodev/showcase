import express from "express";
import { login, register } from "../controllers/authentication";
import { ROUTES } from "../consts";

export default (router: express.Router) => {
  router.post(`${ROUTES.AUTH}/register`, register);
  router.post(`${ROUTES.AUTH}/login`, login);
};

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Returns a list of users. Requires authentication.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 */
