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

// This middleware compresses response bodies using Gzip or Brotli compression. It helps reduce the size of the response and improves performance by speeding up the transfer of data between the server and the client.
app.use(compression());

// This middleware enables Cross-Origin Resource Sharing (CORS). It allows the server to accept requests from different origins (domains). The { credentials: true } option allows cookies and other credentials to be sent in cross-origin requests
app.use(cors({ credentials: true }));

// This middleware parses cookies attached to the req.headers.cookie in the request. It allows you to access cookies via req.cookies.
app.use(cookieParser());

// This middleware parses incoming requests with JSON payloads. It makes the data available on req.body.
app.use(bodyParser.json());

// This middleware parses incoming requests with URL-encoded payloads. The { extended: true } option allows parsing of complex objects and arrays in the request body.
app.use(bodyParser.urlencoded({ extended: true }));

//  This middleware prevents NoSQL injection attacks by sanitizing user input. It removes characters like $ and . from the input, which attackers often use to manipulate MongoDB queries.
app.use(mongoSanitize());

//  This middleware helps secure your app by setting various HTTP headers. It protects against common web vulnerabilities like cross-site scripting (XSS), clickjacking, and MIME-type sniffing.
app.use(helmet());

// This middleware prevents cross-site scripting (XSS) attacks by sanitizing user input. It removes malicious scripts and HTML from the request body, query strings, and parameters.
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

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err}`);
  server.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
