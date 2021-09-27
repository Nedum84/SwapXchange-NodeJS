import { Request, Response, NextFunction } from "express";
import { verify, VerifyErrors } from "jsonwebtoken";
import { UNAUTHORIZED } from "http-status";
import moment from "moment";
import config from "../config/config";
import { ErrorResponse } from "../apiresponse/error.response";

export interface UserPayload {
  user_id: string;
  user_level: number;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user: UserPayload;
    }
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(UNAUTHORIZED);

  verify(token, config.jwt.secret, (err: VerifyErrors | null, data: any) => {
    let dateNow = moment().unix();
    let exp = data?.exp;

    if (err || dateNow > exp) {
      throw new ErrorResponse(
        err?.message ?? "Unauthorized",
        UNAUTHORIZED,
        err?.stack
      );
    }

    req.user = data.user;
    next();
  });
};
