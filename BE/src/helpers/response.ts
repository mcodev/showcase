import express from "express";
import { UNIVERSAL_RESPONSE_MESSAGES } from "../consts";

type StatusCodeType = 200 | 201 | 400 | 401 | 403 | 404 | 409 | 429 | 500;

type UniversalCodesType = keyof typeof UNIVERSAL_RESPONSE_MESSAGES;

type ResponseType = {
  res: express.Response;
  statusCode: StatusCodeType;
  message?: string;
  payload?: any;
};

export const response = ({
  res,
  statusCode,
  message,
  payload,
}: ResponseType) => {
  const MESSAGE =
    message || UNIVERSAL_RESPONSE_MESSAGES[statusCode as UniversalCodesType];

  return res.status(statusCode).json({
    success: Boolean(statusCode < 400),
    data: payload || null,
    ...(statusCode >= 300 ? { error: MESSAGE } : {}),
  });
};
