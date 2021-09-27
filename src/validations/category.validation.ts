import Joi from "joi";

const findOne = {
  params: Joi.object().keys({
    category_id: Joi.string().required(),
  }),
};

const update = {
  params: Joi.object().keys({
    category_id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    category_name: Joi.string().required(),
    category_icon: Joi.string().required(),
    // idx: Joi.string().default(200),
  }),
};

const create = {
  body: Joi.object().keys({
    category_name: Joi.string().required(),
    category_icon: Joi.string().required(),
  }),
};

export default {
  create,
  update,
  findOne,
};
