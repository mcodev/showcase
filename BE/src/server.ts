import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import compression from "compression";
import mongoose from "mongoose";
import router from "./routes";

dotenv.config();

const PORT = process.env.PORT || 8000;

const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.use(compression());
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});
mongoose.connection.on("error", (err) => {
  console.error(err);
  // process.exit(1);
});

app.use("/", router());

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
