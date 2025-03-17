"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getAllUsers = void 0;
const Users_1 = require("../models/Users");
//TODO Maybe this is not needed in the app
const getAllUsers = async (req, res) => {
    try {
        const users = await (0, Users_1.getUsers)();
        return res.status(200).json({ success: true, users });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, error: "Internal server error" });
    }
};
exports.getAllUsers = getAllUsers;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await (0, Users_1.getUserById)(id);
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        await (0, Users_1.deleteUserById)(id);
        return res.status(200).json({ success: true, message: "User deleted" });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, error: "Internal server error" });
    }
};
exports.deleteUser = deleteUser;
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await (0, Users_1.getUserById)(id);
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        const { name,
        // email
         } = req.body;
        if (!name) {
            return res.status(400).json({ success: false, error: "Missing fields" });
        }
        // if (!email) {
        //   return res.status(400).json({ success: false, error: "Missing fields" });
        // }
        // if (email) {
        //   user.email = email;
        // }
        if (name) {
            user.name = name;
        }
        await user.save();
        return res.status(200).json({ success: true, user });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, error: "Internal server error" });
    }
};
exports.updateUser = updateUser;
//# sourceMappingURL=users.js.map