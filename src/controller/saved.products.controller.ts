import { Request, Response } from "express";
import ApiResponse from "../apiresponse/api.response";
import savedProductsService from "../services/saved.products.service";

const removeSaved = async (req: Request, res: Response) => {
  const result = await savedProductsService.removeSaved(req);
  ApiResponse.ok(res, result);
};
const findAllForUser = async (req: Request, res: Response) => {
  const result = await savedProductsService.findAllForUser(req);
  ApiResponse.ok(res, result);
};
const checkSaved = async (req: Request, res: Response) => {
  const { user_id } = req.user;
  const { product_id } = req.params;
  const result = await savedProductsService.checkSaved(user_id, product_id);
  ApiResponse.ok(res, result);
};
const create = async (req: Request, res: Response) => {
  const result = await savedProductsService.create(req);
  ApiResponse.created(res, result);
};

export default {
  removeSaved,
  findAllForUser,
  checkSaved,
  create,
};
