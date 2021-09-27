import { Request, Response } from "express";
import ApiResponse from "../apiresponse/api.response";
import userService from "../services/user.service";

const findMe = async (req: Request, res: Response) => {
  const { user_id } = req.user;
  const result = await userService.findOne(user_id);
  ApiResponse.ok(res, result);
};
const findOne = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const result = await userService.findOne(user_id);
  ApiResponse.ok(res, result);
};
const updateUser = async (req: Request, res: Response) => {
  const result = await userService.updateUser(req);
  ApiResponse.ok(res, result);
};
const updateUserAddress = async (req: Request, res: Response) => {
  const result = await userService.updateUserAddress(req);
  ApiResponse.ok(res, result);
};

export default {
  findMe,
  findOne,
  updateUser,
  updateUserAddress,
};
