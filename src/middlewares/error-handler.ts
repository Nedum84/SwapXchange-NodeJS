import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { CustomError } from "../apiresponse/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .send({ status: err.statusCode, success: false, message: err.message });
  }

  const status = httpStatus.BAD_REQUEST;
  console.error(err);
  res.status(status).send({
    status,
    success: false,
    message: err.message ?? "Something went wrong.",
    stack: err.stack ?? "",
  });
};
