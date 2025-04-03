export type BasicResponseType = {
  success: boolean;
  statusCode: number;
};

export type GlobalResponseDataType<T = any | null> = BasicResponseType & {
  data: T;
};

export type UserDetailsType = {
  _id: string;
  name: string;
};

export type AuthResponseDataType = BasicResponseType & {
  accessToken: string;
  refreshToken: string;
  user: UserDetailsType;
};

export type ResetCodeVerificationDataType = BasicResponseType & {
  data: { temporaryResetToken: string };
};
