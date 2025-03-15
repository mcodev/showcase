import express from "express";
import { register } from "../controllers/authentication";

export default (router: express.Router) => {
  router.post("/auth/register", register);
};
// const express = require("express");
// const { register, login, getMe } = require("../controllers/authController");
// const { protect } = require("../middleware/auth");

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);
// router.get("/me", protect, getMe);

// module.exports = router;
