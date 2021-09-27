import Joi from "joi";

const create = {
  body: Joi.object().keys({
    uid: Joi.string().required(),
    channel_name: Joi.string().required(),
  }),
};

export default {
  create,
};
