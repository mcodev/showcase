export const GLOBAL_ERRORS = {
  UNAUTHORIZED: 'unauthorized',
  UNAUTHORIZED_ACCESS: 'unauthorized_access',
  REQUEST_TIMEOUT: 'request_timeout',
  SERVER_ERROR: 'server_error',
  UNEXPECTED_ERROR: 'unexpected_error',
  BAD_REQUEST: 'bad_request',
} as const;

export const AUTH_ERRORS = {
  SEND_BAD_DATA: 'check-provided-data',
} as const;
