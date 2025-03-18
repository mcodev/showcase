export const isName = (name: string) => {
  const re = /^[A-Za-z]{3,}$/;

  if (re.test(name.trim())) {
    return null;
  }

  return 'invalid_name';
};

export const isEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(String(email).toLowerCase())) {
    return null;
  }

  return 'invalid_email';
};

export const isPassword = (password: string) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (re.test(password)) {
    return null;
  }

  return 'invalid_password';
};

export const isPasswordMatch = (password: string, repeatPassword: string) => {
  if (password === repeatPassword) {
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
