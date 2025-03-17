"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const Users_1 = require("../models/Users");
const helpers_1 = require("../helpers");
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ success: false, error: "Missing required fields" });
        }
        const user = await (0, Users_1.getUserByEmail)(email).select("+authentication.salt +authentication.password");
        if (!user) {
            return res.status(400).json({ success: false, error: "User not found" });
        }
        const expectedHashedPassword = (0, helpers_1.authentication)(user.authentication.salt, password);
        if (user.authentication.password !== expectedHashedPassword) {
            return res
                .status(403)
                .json({ success: false, error: "Invalid credentials" });
        }
        const salt = (0, helpers_1.random)();
        user.authentication.sessionToken = (0, helpers_1.authentication)(salt, user._id.toString());
        await user.save();
        res.cookie("sessionToken", user.authentication.sessionToken, {
            //   domain: "localhost",
            //   path: "/",
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
        });
        //TODO send whole user if needed
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
        };
        res.status(200).json({ success: true, userData }).end();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.login = login;
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ success: false, error: "Missing required fields" });
        }
        const isUserAlreadyRegistered = await (0, Users_1.getUserByEmail)(email);
        if (isUserAlreadyRegistered) {
            return res
                .status(400)
                .json({ success: false, error: "User already registered" });
        }
        const salt = (0, helpers_1.random)();
        const user = await (0, Users_1.createUser)({
            name,
            email,
            authentication: {
                salt,
                password: (0, helpers_1.authentication)(salt, password),
            },
        });
        res.status(201).json({ success: true, user }).end();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.register = register;
//# sourceMappingURL=authentication.js.map