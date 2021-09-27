import { Request, Response } from "express";
import ApiResponse from "../apiresponse/api.response";
import feedbackService from "../services/feedback.service";

const findOne = async (req: Request, res: Response) => {
  const { feedback_id } = req.params;
  const result = await feedbackService.findOne(feedback_id);
  ApiResponse.ok(res, result);
};
const update = async (req: Request, res: Response) => {
  const result = await feedbackService.update(req);
  ApiResponse.ok(res, result);
};
const create = async (req: Request, res: Response) => {
  const result = await feedbackService.create(req);
  ApiResponse.created(res, result);
};
const findAll = async (req: Request, res: Response) => {
  const result = await feedbackService.findAll(req);
  ApiResponse.ok(res, result);
};

export default {
  update,
  findOne,
  create,
  findAll,
};
