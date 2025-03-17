"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../controllers/users");
const auth_1 = require("../middlewares/auth");
exports.default = (router) => {
    // TODO fix any
    router.get("/users", auth_1.isAuthenticated, users_1.getAllUsers);
    router.delete("/users/:id", auth_1.isAuthenticated, auth_1.isOwner, users_1.deleteUser);
    router.patch("/users/:id", auth_1.isAuthenticated, users_1.updateUser);
};
//# sourceMappingURL=users.js.map