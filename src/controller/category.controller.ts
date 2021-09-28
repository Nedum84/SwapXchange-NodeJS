import { Request, Response } from "express";
import ApiResponse from "../apiresponse/api.response";
import categoryService from "../services/category.service";

const findOne = async (req: Request, res: Response) => {
  const { category_id } = req.params;
  const result = await categoryService.findOne(category_id);
  ApiResponse.ok(res, { category: result });
};
const update = async (req: Request, res: Response) => {
  const result = await categoryService.update(req);
  ApiResponse.ok(res, { category: result });
};
const create = async (req: Request, res: Response) => {
  const result = await categoryService.create(req);
  ApiResponse.created(res, { category: result });
};
const findAll = async (req: Request, res: Response) => {
  const result = await categoryService.findAll(req);
  ApiResponse.ok(res, { category: result });
};

export default {
  update,
  findOne,
  create,
  findAll,
};
