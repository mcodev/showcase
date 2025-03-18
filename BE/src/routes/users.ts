// TODO Maybe this is not needed in the app
import express from "express";

import { deleteUser, getAllUsers, updateUser } from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares/auth";
import { ROUTES } from "../consts";

export default (router: express.Router) => {
  router.get(`${ROUTES.USERS}`, isAuthenticated, getAllUsers);
  router.delete(`${ROUTES.USERS}/:id`, isAuthenticated, isOwner, deleteUser);
  router.patch(`${ROUTES.USERS}/:id`, isAuthenticated, updateUser);
};

// /**
//  * @swagger
//  * /users:
//  *   get:
//  *     summary: Get all users
//  *     tags: [Users]
//  *     security:
//  *       - APP-AUTH: []
//  *     responses:
//  *       200:
//  *         description: A list of users
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 users:
//  *                   type: array
//  *                   items:
//  *                     $ref: '#/components/schemas/User'
//  *
//  */

// /**
//  * @swagger
//  * /users:
//  *   delete:
//  *     summary: Delete a user
//  *     tags: [Users]
//  *     security:
//  *       - APP-AUTH: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The ID of the user to delete
//  *     responses:
//  *       200:
//  *         description: The user has been deleted
//  *
//  */
