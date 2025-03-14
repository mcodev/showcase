"use strict";
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=authController.js.map