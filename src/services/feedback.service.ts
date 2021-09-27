import { Request, Response } from "express";
import httpStatus from "http-status";
import { ErrorResponse } from "../apiresponse/error.response";
import { Feedback } from "../models/feedback.model";
import Helpers from "../utils/helpers";

const findOne = async (feedback_id: string) => {
  const feedback = await Feedback.findOne({ where: { feedback_id } });
  if (!feedback) {
    throw new ErrorResponse("No feedback found", httpStatus.NOT_FOUND);
  }
  return feedback;
};
const update = async (req: Request) => {
  const { feedback_id } = req.params;
  const { status } = req.body;
  const feedback = await findOne(feedback_id);
  feedback.status = status;
  await feedback.save();
  return feedback.reload();
};
const create = async (req: Request) => {
  const { message } = req.body;
  const { user_id } = req.user;

  const feedback = await Feedback.create({
    message,
    user_id,
  });
  return feedback;
};
const findAll = async (req: Request) => {
  // const { limit, offset } = Helpers.getPaginate(req.query);
  const paginateOptions = Helpers.getPaginate(req.params);
  const { status } = req.params;
  const where = status === "all" ? {} : { status };
  const feedbacks = await Feedback.findAll({
    where,
    order: [["id", "DESC"]],
    // limit,
    // offset,
    ...paginateOptions,
  });
  return feedbacks;
};

export default {
  update,
  findOne,
  create,
  findAll,
};
