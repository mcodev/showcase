"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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