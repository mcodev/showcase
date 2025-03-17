export const ROUTES = {
  AUTH: "/auth",
  USERS: "/users",
} as const;

export const ROUTES_NAMES = {
  AUTH: "AUTH",
  USERS: "USERS",
} as const;

export const RESPONSE_MESSAGES = {
  AUTH: {
    201: "USER_CREATED",
    400: "MISSING_REQUIRED_FIELDS",
    403: "INVALID_CREDENTIALS",
    404: "USER_NOT_FOUND",
    409: "USER_ALREADY_REGISTERED",
  },
  USERS: {
    201: "CREATED",
    400: "MISSING_REQUIRED_FIELDS",
    401: "UNAUTHORIZED",
    403: "FORBIDDEN",
    404: "USER_NOT_FOUND",
    409: "CONFLICT",
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
} as const;
