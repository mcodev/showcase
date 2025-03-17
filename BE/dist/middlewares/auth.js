"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOwner = exports.isAuthenticated = void 0;
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
const isOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const currentUserId = (0, lodash_1.get)(req, "identity._id");
        if (!currentUserId) {
            return res.status(403).json({ success: false, msg: "Not authorized" });
        }
        if (currentUserId.toString() !== id) {
            return res.status(403).json({ success: false, msg: "Not authorized" });
        }
        return next();
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({ success: false, msg: "Not authorized" });
    }
};
exports.isOwner = isOwner;
//# sourceMappingURL=auth.js.map