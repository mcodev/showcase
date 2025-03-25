import login from "./login";
import logout from "./logout";
import register from "./register";
import request_password_reset from "./request_password_reset";

const AUTHENTICATION = {
  LOGIN: login,
  LOGOUT: logout,
  REGISTER: register,
  REQUEST_PASSWORD_RESET: request_password_reset,
};

export default AUTHENTICATION;
