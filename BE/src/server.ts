import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import compression from "compression";
import mongoose from "mongoose";
import router from "./routes";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
const xss = require("xss-clean");

dotenv.config();

const PORT = process.env.PORT || 8000;

const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.use(compression());
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  Sanitize data
app.use(mongoSanitize());

//  Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

app.use("/", router());

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
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err}`);
  server.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
