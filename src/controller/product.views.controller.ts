import { Request, Response } from "express";
import ApiResponse from "../apiresponse/api.response";
import productViewsService from "../services/product.views.service";

const findAll = async (req: Request, res: Response) => {
  const { product_id } = req.params;

  const result = await productViewsService.findAll(product_id);
  ApiResponse.ok(res, result);
};
const create = async (req: Request, res: Response) => {
  const result = await productViewsService.create(req);
  ApiResponse.created(res, result);
};

export default {
  findAll,
  create,
};
