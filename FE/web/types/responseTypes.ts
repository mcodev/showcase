export type GlobalResponseDataType = {
  success: boolean;
  statusCode: number;
  data: any | null;
};

export type UserDetailsType = {
  _id: string;
  name: string;
};

export type AuthResponseDataType = GlobalResponseDataType & {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: UserDetailsType;
};
