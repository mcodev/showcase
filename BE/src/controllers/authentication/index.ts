import login from "./login";
import logout from "./logout";
import register from "./register";
import request_password_reset from "./request_password_reset";
import { reset_password } from "./reset_password";
import { verify_reset_code } from "./verify_reset_code";

const AUTHENTICATION = {
  LOGIN: login,
  LOGOUT: logout,
  REGISTER: register,
  REQUEST_PASSWORD_RESET: request_password_reset,
  RESET_PASSWORD: reset_password,
  VERIFY_RESET_CODE: verify_reset_code,
};

export default AUTHENTICATION;
