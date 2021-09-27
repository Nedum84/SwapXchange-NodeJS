import { Request, Response } from "express";
import ApiResponse from "../apiresponse/api.response";
import subcategoryService from "../services/subcategory.service";

const findOne = async (req: Request, res: Response) => {
  const { sub_category_id } = req.params;
  const result = await subcategoryService.findOne(sub_category_id);
  ApiResponse.ok(res, result);
};
const update = async (req: Request, res: Response) => {
  const result = await subcategoryService.update(req);
  ApiResponse.ok(res, result);
};
const create = async (req: Request, res: Response) => {
  const result = await subcategoryService.create(req);
  ApiResponse.created(res, result);
};
const findByCategoryId = async (req: Request, res: Response) => {
  const { category_id } = req.params;
  const result = await subcategoryService.findByCategoryId(category_id);
  ApiResponse.ok(res, result);
};
const findAll = async (req: Request, res: Response) => {
  const result = await subcategoryService.findAll(req);
  ApiResponse.ok(res, result);
};

export default {
  update,
  findOne,
  create,
  findAll,
  findByCategoryId,
};
