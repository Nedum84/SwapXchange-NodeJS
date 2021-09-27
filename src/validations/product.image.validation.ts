import Joi from "joi";

const findAll = {
  params: Joi.object().keys({
    product_id: Joi.string().required(),
  }),
};
const findOne = {
  params: Joi.object().keys({
    image_id: Joi.string().required(),
  }),
};

const deleteOne = {
  params: Joi.object().keys({
    image_id: Joi.string().required(),
  }),
};

const update = {
  params: Joi.object().keys({
    image_id: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      idx: Joi.number().required(),
    })
    .min(1),
};

const create = {
  body: Joi.object().keys({
    // image_id: Joi.string().default(0),
    product_id: Joi.string().required(),
    image_path: Joi.string().required(),
    idx: Joi.number().default(0),
  }),
};

export default {
  create,
  update,
  findAll,
  findOne,
  deleteOne,
};
