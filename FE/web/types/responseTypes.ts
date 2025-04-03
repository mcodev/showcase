export type GlobalResponseDataType = {
  success: boolean;
  statusCode: number;
  data: any | null;
};

type BasicResponseType = {
  success: boolean;
  statusCode: number;
};

export type UserDetailsType = {
  _id: string;
  name: string;
};

export type AuthResponseDataType = BasicResponseType & {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: UserDetailsType;
};

export type ResetCodeVerificationDataType = BasicResponseType & {
  data: { temporaryResetToken: string };
};
