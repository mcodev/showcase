type GlobalResponseDataType = {
  success: boolean;
  statusCode: number;
};

export type LoginResponseDataType = GlobalResponseDataType & {
  success: boolean;
  error: string;
  message: string;
  token: string;
};
