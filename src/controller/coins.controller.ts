import { Request, Response } from "express";
import ApiResponse from "../apiresponse/api.response";
import coinsService from "../services/coins.service";
import Helpers from "../utils/helpers";

const findAllByUserId = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const { limit } = Helpers.getPaginate(req.query);
  const result = await coinsService.findAllByUserId(user_id, limit);
  ApiResponse.ok(res, result);
};
const create = async (req: Request, res: Response) => {
  const { user_id } = req.user;

  const result = await coinsService.create({ user_id, ...req.body });
  ApiResponse.created(res, result);
};
const createForUser = async (req: Request, res: Response) => {
  const result = await coinsService.createForUser(req);
  ApiResponse.created(res, result);
};
const getBalance = async (req: Request, res: Response) => {
  const { user_id } = req.user;
  const result = await coinsService.getBalance(user_id);
  ApiResponse.ok(res, result);
};

export default {
  findAllByUserId,
  create,
  createForUser,
  getBalance,
};
