import { Request } from "express";
import httpStatus from "http-status";
import { ErrorResponse } from "../apiresponse/error.response";
import { TokenTypes } from "../enum/token.enum";
import { Token } from "../models";
import tokenService from "./token.service";
import userService from "./user.service";

const logout = async (refreshToken: string) => {
  const refreshTokenDoc = await Token.findOne({
    where: {
      token: refreshToken,
      type: TokenTypes.REFRESH,
    },
  });
  if (!refreshTokenDoc) {
    throw new ErrorResponse("Token Not found");
  }
  await refreshTokenDoc.destroy();
};

const refreshToken = async (req: Request) => {
  const { refresh_token } = req.body;
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refresh_token,
      TokenTypes.REFRESH
    );
    const user = await userService.findOne(refreshTokenDoc.user_id);
    if (!user) {
      throw new ErrorResponse("User not found");
    }
    await refreshTokenDoc.destroy();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ErrorResponse("Please authenticate", httpStatus.UNAUTHORIZED);
  }
};

export default {
  logout,
  refreshToken,
};
