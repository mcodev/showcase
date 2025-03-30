import { SERVICE } from '@/services';

export type RequestResult<T> = Promise<T | null>;

export interface GlobalResponseDataType<T> {
  statusCode: number;
  success: boolean;
  data: T | null;
}

export type UserDetailsType = {
  _id: string;
  name: string;
};

export type AuthResponseDataType = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: UserDetailsType;
};

type ResetCodeVerificationDataType = {
  temporaryResetToken: string;
};

export interface ServiceResponseTypeMap {
  [SERVICE.LOGIN_SERVICE]: AuthResponseDataType;
  [SERVICE.SIGN_UP_SERVICE]: AuthResponseDataType;
  [SERVICE.RESET_CODE_VERIFICATION_SERVICE]: ResetCodeVerificationDataType;
}
