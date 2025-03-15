"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.deleteUserById = exports.createUser = exports.getUserById = exports.getUserBySessionToken = exports.getUserByEmail = exports.getUsers = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const useColorSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    authentication: {
        password: {
            type: String,
            required: true,
            select: false,
        },
        salt: {
            type: String,
            select: false,
        },
        sessionToken: {
            type: String,
            select: false,
        },
    },
});
exports.UserModel = mongoose_1.default.model("User", useColorSchema);
const getUsers = async () => {
    return await exports.UserModel.find();
};
exports.getUsers = getUsers;
const getUserByEmail = async (email) => {
    return await exports.UserModel.findOne({ email });
};
exports.getUserByEmail = getUserByEmail;
const getUserBySessionToken = async (sessionToken) => {
    return await exports.UserModel.findOne({
        "authentication.sessionToken": sessionToken,
    });
};
exports.getUserBySessionToken = getUserBySessionToken;
const getUserById = async (id) => {
    return await exports.UserModel.findById(id);
};
exports.getUserById = getUserById;
const createUser = async (values) => {
    new exports.UserModel(values).save().then((user) => {
        user.toObject();
    });
};
exports.createUser = createUser;
const deleteUserById = async (id) => {
    return await exports.UserModel.findByIdAndDelete(id);
};
exports.deleteUserById = deleteUserById;
const updateUserById = async (id, values) => {
    return await exports.UserModel.findByIdAndUpdate(id, values);
};
exports.updateUserById = updateUserById;
//# sourceMappingURL=Users.js.map