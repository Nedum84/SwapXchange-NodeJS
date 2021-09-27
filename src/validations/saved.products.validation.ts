import Joi from "joi";
import { paginateDefault } from "./custom.validation";

const removeSaved = {
  params: Joi.object().keys({
    product_id: Joi.string().required(),
  }),
};
const findAllForUser = {
  params: Joi.object().keys(paginateDefault),
};

const checkSaved = {
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
  removeSaved,
  findAllForUser,
  checkSaved,
  create,
};
