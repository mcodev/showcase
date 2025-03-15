"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const Users_1 = require("../models/Users");
const helpers_1 = require("../helpers");
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
        const hashedPassword = await (0, helpers_1.hashPassword)(password);
        const user = await (0, Users_1.createUser)({
            name,
            email,
            authentication: {
                password: hashedPassword,
                salt,
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
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };
// exports.register = async (req, res) => {
//   const { name, email, password } = req.body;
//   const user = await User.create({ name, email, password });
//   const token = createToken(user._id);
//   res.status(201).json({ success: true, token });
// };
// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ success: false, msg: "Invalid credentials" });
//   }
//   const token = createToken(user._id);
//   res.status(200).json({ success: true, token });
// };
// exports.getMe = async (req, res) => {
//   const user = await User.findById(req.user.id);
//   res.status(200).json({ success: true, data: user });
// };
//# sourceMappingURL=authentication.js.map