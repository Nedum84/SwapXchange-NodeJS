import { Request, Response } from "express";
import ApiResponse from "../apiresponse/api.response";
import authService from "../services/auth.service";
import tokenService from "../services/token.service";
import userService from "../services/user.service";

const register = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);

  ApiResponse.created(res, {
    user,
    tokens,
  });
};
const logout = async (req: Request, res: Response) => {
  await authService.logout(req.body.refresh_token);
  ApiResponse.ok(res);
};

const refreshToken = async (req: Request, res: Response) => {
  const tokens = await authService.refreshToken(req);
  ApiResponse.ok(res, { tokens });
};

export default {
  register,
  refreshToken,
  logout,
};
