/* eslint-disable no-useless-escape */
export const isValidName = (name: string) => {
  const re = /^[A-Za-z ]{3,15}$/;

  if (re.test(name.trim())) {
    return null;
  }

  return 'invalid_name';
};

export const isValidEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(String(email).toLowerCase().trim())) {
    return null;
  }

  return 'invalid_email';
};

export const isValidPassword = (password: string) => {
  const re =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

  if (re.test(password.trim())) {
    return null;
  }

  return 'invalid_password';
};

export const isPasswordMatch = (password: string, repeatPassword: string) => {
  if (password.trim() === repeatPassword.trim()) {
    return null;
  }

  return 'passwords_do_not_match';
};

export const isTermsOfServiceAccepted = (termsOfService: boolean) => {
  if (termsOfService) {
    return null;
  }

  return 'must_accept_terms';
};
