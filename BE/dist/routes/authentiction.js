"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../controllers/authentication");
exports.default = (router) => {
    router.post("/auth/register", authentication_1.register);
};
// const express = require("express");
// const { register, login, getMe } = require("../controllers/authController");
// const { protect } = require("../middleware/auth");
// const router = express.Router();
// router.post("/register", register);
// router.post("/login", login);
// router.get("/me", protect, getMe);
// module.exports = router;
//# sourceMappingURL=authentiction.js.map