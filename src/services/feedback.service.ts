import { Request } from "express";
import httpStatus from "http-status";
import { ErrorResponse } from "../apiresponse/error.response";
import { Feedback } from "../models";
import Helpers from "../utils/helpers";
import randomString from "../utils/random.string";

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
  const { user_level } = req.user;
  if (!user_level || user_level == 1) {
    throw new ErrorResponse("Access denied", httpStatus.UNAUTHORIZED);
  }

  const feedback = await findOne(feedback_id);
  feedback.status = status;
  await feedback.save();
  return feedback.reload();
};
const create = async (req: Request) => {
  const { message } = req.body;
  const { user_id } = req.user;

  const feedback_id = await randomString.generateUniqueCharsForColumn(
    Feedback,
    "feedback_id"
  );
  const feedback = await Feedback.create({
    message,
    user_id,
    feedback_id,
  });
  return feedback;
};
const findAll = async (req: Request) => {
  // const { limit, offset } = Helpers.getPaginate(req.query);
  const paginateOptions = Helpers.getPaginate(req.query);

  const { status } = req.query;
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
