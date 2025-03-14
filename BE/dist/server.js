"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;
const app = (0, express_1.default)();
app.use((0, compression_1.default)());
app.use((0, cors_1.default)({ credentials: true }));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const server = http_1.default.createServer(app);
server.listen(PORT, () => {
    console.log("Server running on port 3000");
});
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(MONGO_URL);
mongoose_1.default.connection.on("error", (err) => {
    console.error(err);
    // process.exit(1);
});
// // const express = require("express");
// const dotenv = require("dotenv");
// // const mongoose = require("mongoose");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const helmet = require("helmet");
// const mongoSanitize = require("express-mongo-sanitize");
// const xss = require("xss-clean");
// // const errorHandler = require("./middleware/error");
// // const connectDB = require("./config/db");
// // Load env vars
// dotenv.config({ path: "./config/config.env" });
// // Connect to database
// connectDB();
// const auth = require("./routes/auth");
// const app = express();
// // Body parser
// app.use(express.json());
// // Cookie parser
// app.use(cookieParser());
// // Sanitize data
// app.use(mongoSanitize());
// // Set security headers
// app.use(helmet());
// // Prevent XSS attacks
// app.use(xss());
// // Enable CORS
// app.use(cors());
// // Mount routers
// app.use("/api/v1/auth", auth);
// // Error Handler
// app.use(errorHandler);
// const PORT = process.env.PORT || 5000;
// const server = app.listen(PORT, () =>
//   console.log(`Server running on port ${PORT}`)
// );
// // Handle unhandled promise rejections
// process.on("unhandledRejection", (err) => {
//   console.log(`Error: ${err.message}`);
//   server.close(() => process.exit(1));
// });
// process.on("uncaughtException", (err) => {
//   console.log(`Error: ${err.message}`);
//   server.close(() => process.exit(1));
// });
//# sourceMappingURL=server.js.map