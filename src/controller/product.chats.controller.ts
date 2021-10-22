import { Request, Response } from "express";
import ApiResponse from "../apiresponse/api.response";
import productChatsService from "../services/product.chats.service";

const findOne = async (req: Request, res: Response) => {
  const { product_chat_id } = req.params;
  const result = await productChatsService.findOne(product_chat_id);
  ApiResponse.ok(res, { product_chat: result });
};
const update = async (req: Request, res: Response) => {
  const result = await productChatsService.update(req);
  ApiResponse.ok(res, { product_chat: result });
};
const create = async (req: Request, res: Response) => {
  const result = await productChatsService.create(req);
  ApiResponse.created(res, { product_chat: result });
};
const findLatestForTwoUsers = async (req: Request, res: Response) => {
  const result = await productChatsService.findLatestForTwoUsers(req);
  ApiResponse.ok(res, { product_chat: result });
};
const findAll = async (req: Request, res: Response) => {
  const result = await productChatsService.findAll();
  ApiResponse.ok(res, { product_chat: result });
};
const markCompleted = async (req: Request, res: Response) => {
  const result = await productChatsService.markCompleted(req);
  ApiResponse.ok(res, { products: result });
};

export default {
  update,
  findOne,
  create,
  findLatestForTwoUsers,
  findAll,
  markCompleted,
};
