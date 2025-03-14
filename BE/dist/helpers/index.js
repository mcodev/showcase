"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = exports.random = exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const SECRET = process.env.SECRET;
const hashPassword = async (password) => {
    return await bcryptjs_1.default.hash(password, 10);
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hash) => {
    return await bcryptjs_1.default.compare(password, hash);
};
exports.comparePassword = comparePassword;
const random = () => {
    return crypto_1.default.randomBytes(128).toString("base64");
};
exports.random = random;
const authentication = (salt, password) => {
    return crypto_1.default
        .createHmac("sha256", [salt, password].join("/"))
        .update(salt)
        .digest("hex");
};
exports.authentication = authentication;
//# sourceMappingURL=index.js.map