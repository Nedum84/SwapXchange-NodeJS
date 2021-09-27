import Joi from "joi";

const findOne = {
  params: Joi.object().keys({
    faq_id: Joi.string().required(),
  }),
};

const update = {
  params: Joi.object().keys({
    faq_id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    question: Joi.string().required(),
    answer: Joi.string().required(),
  }),
};

const create = {
  body: Joi.object().keys({
    question: Joi.string().required(),
    answer: Joi.string().required(),
  }),
};

export default {
  create,
  update,
  findOne,
};
