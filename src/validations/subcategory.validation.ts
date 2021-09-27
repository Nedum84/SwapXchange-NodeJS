import Joi from "joi";

const findOne = {
  params: Joi.object().keys({
    sub_category_id: Joi.string().required(),
  }),
};

const findByCategoryId = {
  params: Joi.object().keys({
    category_id: Joi.string().required(),
  }),
};

const update = {
  params: Joi.object().keys({
    sub_category_id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    category_id: Joi.string().required(),
    sub_category_name: Joi.string().required(),
    sub_category_icon: Joi.string().required(),
    idx: Joi.number().default(200),
  }),
};

const create = {
  body: Joi.object().keys({
    category_id: Joi.string().required(),
    sub_category_name: Joi.string().required(),
    sub_category_icon: Joi.string(),
  }),
};

export default {
  create,
  update,
  findOne,
  findByCategoryId,
};
