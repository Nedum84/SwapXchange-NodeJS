import { Request, Response } from "express";
import ApiResponse from "../apiresponse/api.response";
import faqsService from "../services/faqs.service";

const findOne = async (req: Request, res: Response) => {
  const { faq_id } = req.params;
  const result = await faqsService.findOne(faq_id);
  ApiResponse.ok(res, { faq: result });
};
const update = async (req: Request, res: Response) => {
  const result = await faqsService.update(req);
  ApiResponse.ok(res, { faq: result });
};
const create = async (req: Request, res: Response) => {
  const result = await faqsService.create(req);
  ApiResponse.created(res, { faq: result });
};
const findAll = async (req: Request, res: Response) => {
  const result = await faqsService.findAll();
  ApiResponse.ok(res, { faq: result });
};

export default {
  update,
  findOne,
  create,
  findAll,
};
