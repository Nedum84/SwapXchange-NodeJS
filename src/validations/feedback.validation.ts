import Joi from "joi";
import { FeedbackStatus } from "../enum/feedback.enum";
import { paginateDefault } from "./custom.validation";

const findOne = {
  params: Joi.object().keys({
    feedback_id: Joi.string().required(),
  }),
};
const findAll = {
  query: Joi.object().keys({
    status: Joi.string()
      .default("all")
      .valid("all", ...Object.values(FeedbackStatus)),
    ...paginateDefault,
  }),
};

const update = {
  params: Joi.object().keys({
    feedback_id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    status: Joi.string()
      .required()
      .valid(...Object.values(FeedbackStatus)),
  }),
};

const create = {
  body: Joi.object().keys({
    message: Joi.string().required(),
  }),
};

export default {
  create,
  update,
  findOne,
  findAll,
};
