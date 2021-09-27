import { Request, Response } from "express";
import ApiResponse from "../apiresponse/api.response";
import reportedProductsService from "../services/reported.products.service";

const findOne = async (req: Request, res: Response) => {
  const { reported_id } = req.params;
  const result = await reportedProductsService.findOne(reported_id);
  ApiResponse.ok(res, result);
};
const update = async (req: Request, res: Response) => {
  const result = await reportedProductsService.update(req);
  ApiResponse.ok(res, result);
};
const create = async (req: Request, res: Response) => {
  const result = await reportedProductsService.create(req);
  ApiResponse.created(res, result);
};
const findByProductId = async (req: Request, res: Response) => {
  const result = await reportedProductsService.findByProductId(req);
  ApiResponse.ok(res, result);
};
const findAll = async (req: Request, res: Response) => {
  const result = await reportedProductsService.findAll(req);
  ApiResponse.ok(res, result);
};

export default {
  update,
  findOne,
  create,
  findAll,
  findByProductId,
};
