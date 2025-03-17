"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const Users_1 = require("../models/Users");
const lodash_1 = require("lodash");
const isAuthenticated = async (req, res, next) => {
    try {
        const sessionToken = req.cookies["APP-AUTH"];
        if (!sessionToken) {
            return res.status(403).json({ success: false, msg: "Not authorized" });
        }
        const existingUser = await (0, Users_1.getUserBySessionToken)(sessionToken);
        if (!existingUser) {
            return res.status(403).json({ success: false, msg: "Not authorized" });
        }
        (0, lodash_1.merge)(req, {
            identity: existingUser,
        });
        return next();
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({ success: false, msg: "Not authorized" });
    }
};
exports.isAuthenticated = isAuthenticated;
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// exports.protect = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ success: false, msg: "Not authorized" });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id);
//     next();
//   } catch (err) {
//     res.status(401).json({ success: false, msg: "Not authorized" });
//   }
// };
//# sourceMappingURL=auth.js.map