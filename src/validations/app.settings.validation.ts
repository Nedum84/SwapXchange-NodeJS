// import { object, string, required, any, date } from "joi";
import Joi from "joi";

const findOne = {
  params: Joi.object().keys({
    key: Joi.string().required(),
  }),
};

const update = {
  body: Joi.object().keys({
    key: Joi.string().required(),
    value: Joi.string().required(),
  }),
};
const addNew = {
  body: Joi.object().keys({
    key: Joi.string().required(),
    value: Joi.string().required(),
  }),
};

export default {
  addNew,
  update,
  findOne,
};
