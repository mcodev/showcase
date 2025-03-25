import express from "express";
import {
  ROUTES,
  RESPONSE_MESSAGES,
  UNIVERSAL_RESPONSE_MESSAGES,
} from "../consts";

type StatusCodeType = keyof (typeof RESPONSE_MESSAGES)[
  | keyof typeof ROUTES
  | "DEFAULT"];

type UniversalCodesType = keyof typeof UNIVERSAL_RESPONSE_MESSAGES;

type ResponseType = {
  res: express.Response;
  statusCode: StatusCodeType | UniversalCodesType;
  route?: keyof typeof ROUTES;
  customMessage?: string;
  payload?: any;
};

export const response = ({
  res,
  statusCode,
  route,
  customMessage,
  payload,
}: ResponseType) => {
  const AUTOMATED_MESSAGE =
    statusCode === 500 || statusCode === 200 || statusCode === 403
      ? UNIVERSAL_RESPONSE_MESSAGES[statusCode]
      : RESPONSE_MESSAGES[route || "DEFAULT"][statusCode];

  return res.status(statusCode).json({
    success: Boolean(statusCode < 400),
    data: payload || null,
    ...(statusCode >= 400 ? { error: customMessage || AUTOMATED_MESSAGE } : {}),
  });
};
