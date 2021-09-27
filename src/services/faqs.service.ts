import { Request, Response } from "express";
import httpStatus from "http-status";
import { ErrorResponse } from "../apiresponse/error.response";
import { Faqs } from "../models/faqs.model";

const findOne = async (faq_id: string) => {
  const faq = await Faqs.findOne({ where: { faq_id } });
  if (!faq) {
    throw new ErrorResponse("No faq found!");
  }
  return faq;
};
const update = async (req: Request) => {
  const { faq_id } = req.params;
  const { question, answer } = req.body;
  const faq = await findOne(faq_id);

  const { user_level } = req.user;
  if (!user_level || user_level == 1) {
    throw new ErrorResponse("Access denied", httpStatus.UNAUTHORIZED);
  }
  Object.assign(faq, { question, answer });
  await faq.save();
  return faq.reload();
};
const create = async (req: Request) => {
  const { question, answer } = req.body;
  const { user_id } = req.user;

  const { user_level } = req.user;
  if (!user_level || user_level == 1) {
    throw new ErrorResponse("Access denied", httpStatus.UNAUTHORIZED);
  }
  const faq = await Faqs.create({
    question,
    answer,
    added_by: user_id,
  });
  return faq;
};
const findAll = async () => {
  const faqs = await Faqs.findAll({ order: [["id", "DESC"]] });
  return faqs;
};

export default {
  update,
  findOne,
  create,
  findAll,
};
