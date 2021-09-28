import { Request, Response } from "express";
import ApiResponse from "../apiresponse/api.response";
import productImageService from "../services/product.image.service";

const findOne = async (req: Request, res: Response) => {
  const { image_id } = req.params;
  const result = await productImageService.findOne(image_id);
  ApiResponse.ok(res, { image_product: result });
};
const findAll = async (req: Request, res: Response) => {
  const { product_id } = req.params;
  const result = await productImageService.findAll(product_id);
  ApiResponse.ok(res, { image_product: result });
};
const deleteOne = async (req: Request, res: Response) => {
  const result = await productImageService.deleteOne(req);
  ApiResponse.ok(res, result, "Image successfully deleted");
};
const create = async (req: Request, res: Response) => {
  const { body } = req;
  const result = await productImageService.createOne(body);
  ApiResponse.created(res, { image_product: result });
};
const update = async (req: Request, res: Response) => {
  const result = await productImageService.update(req);
  ApiResponse.created(res, { image_product: result });
};

export default {
  findAll,
  findOne,
  create,
  update,
  deleteOne,
};
