import Joi from "joi";

const findAll = {
  params: Joi.object().keys({
    product_id: Joi.string().required(),
  }),
};

const create = {
  body: Joi.object().keys({
    product_id: Joi.string().required(),
  }),
};

export default {
  create,
  findAll,
};
