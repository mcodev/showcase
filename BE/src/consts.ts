import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 8000;

export const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017";

export const ENVIRONMENT = process.env.NODE_ENV || "development";

export const FE_URL = process.env.FE_URL || "http://localhost:3000";

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "secret";

export const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "secret";

export const ACCESS_TOKEN_EXPIRATION = "12h";

export const REFRESH_TOKEN_EXPIRATION = "7d";

export const RESET_CODE_EXPIRY = "15m";

export const PASSWORD_ENCRYPTION_LEVEL = 10;

export const ROUTES = {
  AUTH: "/auth",
  USERS: "/users",
  REFRESH: "/refresh",
} as const;

export const ROUTES_NAMES = {
  AUTH: "AUTH",
  USERS: "USERS",
  REFRESH: "REFRESH",
} as const;

export const RESPONSE_MESSAGES = {
  REFRESH: {
    201: "TOKEN_REFRESHED",
    400: "NO_REFRESH_TOKEN_PROVIDED",
    403: "INVALID_REFRESH_TOKEN",
    404: "REFRESH_TOKEN_NOT_FOUND",
    409: "",
  },
  AUTH: {
    201: "USER_CREATED",
    400: "MISSING_REQUIRED_FIELDS",
    403: "INVALID_CREDENTIALS",
    404: "USER_NOT_FOUND",
    409: "USER_ALREADY_REGISTERED",
  },
  USERS: {
    201: "",
    400: "",
    401: "",
    403: "",
    404: "",
    409: "",
  },
  DEFAULT: {
    201: "CREATED",
    400: "BAD_REQUEST",
    401: "UNAUTHORIZED",
    403: "FORBIDDEN",
    404: "NOT_FOUND",
    409: "CONFLICT",
  },
} as const;

export const UNIVERSAL_RESPONSE_MESSAGES = {
  200: "OK",
  500: "INTERNAL_SERVER_ERROR",
  403: "TOKEN_EXPIRED",
} as const;
