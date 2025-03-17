"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
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
//# sourceMappingURL=users.js.map