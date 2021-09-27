import { Request, Response } from "express";
import ApiResponse from "../apiresponse/api.response";
import productService from "../services/product.service";

const findOne = async (req: Request, res: Response) => {
  const { product_id } = req.params;
  const result = await productService.findOne(product_id);

  //@ts-ignore
  result.hello = "suggestions";
  ApiResponse.ok(res, result);
};
const update = async (req: Request, res: Response) => {
  const result = await productService.update(req);
  ApiResponse.ok(res, result);
};
const create = async (req: Request, res: Response) => {
  const result = await productService.create(req);
  ApiResponse.created(res, result);
};
const findByCategory = async (req: Request, res: Response) => {
  const result = await productService.findByCategory(req);
  ApiResponse.ok(res, result);
};
const findBySubCategory = async (req: Request, res: Response) => {
  const result = await productService.findBySubCategory(req);
  ApiResponse.ok(res, result);
};
const findBySearch = async (req: Request, res: Response) => {
  const result = await productService.findBySearch(req);
  ApiResponse.ok(res, result);
};
const findExchangeOptions = async (req: Request, res: Response) => {
  const result = await productService.findExchangeOptions(req);
  ApiResponse.ok(res, result);
};
const findMyProducts = async (req: Request, res: Response) => {
  const result = await productService.findMyProducts(req);
  ApiResponse.ok(res, result);
};
const findNearUsers = async (req: Request, res: Response) => {
  const result = await productService.findNearUsers(req);
  ApiResponse.ok(res, result);
};
const findSearchSuggestions = async (req: Request, res: Response) => {
  const result = await productService.findSearchSuggestions(req);
  ApiResponse.ok(res, result);
};
const findUserProducts = async (req: Request, res: Response) => {
  const result = await productService.findUserProducts(req);
  ApiResponse.ok(res, result);
};
const findAll = async (req: Request, res: Response) => {
  const result = await productService.findAll(req);
  ApiResponse.ok(res, result);
};

export default {
  findOne,
  findAll,
  findByCategory,
  findBySubCategory,
  findBySearch,
  findExchangeOptions,
  findMyProducts,
  findNearUsers,
  findSearchSuggestions,
  findUserProducts,
  update,
  create,
};
