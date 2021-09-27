import Joi from "joi";
import { ReportedProductStatus } from "../enum/reported.products.enum";
import { paginateDefault } from "./custom.validation";

const findOne = {
  params: Joi.object().keys({
    reported_id: Joi.string().required(),
  }),
};

const findAll = {
  params: Joi.object().keys({
    status: Joi.string()
      .default("all")
      .valid("all", ...Object.values(ReportedProductStatus)),
    ...paginateDefault,
  }),
};

const findByProductId = {
  params: Joi.object().keys({
    product_id: Joi.string().required(),
    status: Joi.string()
      .valid(...Object.values(ReportedProductStatus))
      .required(),
  }),
};
const update = {
  params: Joi.object().keys({
    reported_id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    status: Joi.string()
      .valid(...Object.values(ReportedProductStatus))
      .required(),
  }),
};

const create = {
  body: Joi.object().keys({
    product_id: Joi.string().required(),
    reported_message: Joi.string().required(),
  }),
};

export default {
  create,
  update,
  findOne,
  findAll,
  findByProductId,
};
