export const isName = (name: string) => {
  const re = /^[a-zA-Z ]+$/;
  if (re.test(name)) {
    return null;
  }

  return 'Name must contain only letters and spaces';
};

export const isEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(String(email).toLowerCase())) {
    return null;
  }

  return 'Invalid email';
};

export const isPassword = (password: string) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (re.test(password)) {
    return null;
  }

  return 'Password must be at least 8 characters long and contain at least one letter and one number';
};

export const isPasswordMatch = (password: string, repeatPassword: string) => {
  if (password === repeatPassword) {
    return null;
  }

  return 'Passwords do not match';
};

export const isTermsOfServiceAccepted = (termsOfService: boolean) => {
  if (termsOfService) {
    return null;
  }

  return 'You must accept the terms of service';
};
