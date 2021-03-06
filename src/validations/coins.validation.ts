import Joi from "joi";
import { MethodOfSub } from "../enum/coins.enum";
import { paginateDefault } from "./custom.validation";

const findAllByUserId = {
  params: Joi.object().keys({
    user_id: Joi.string().required(),
  }),
  query: Joi.object().keys(paginateDefault),
};

// const create = {
//   body: Joi.object().keys({
//     amount: Joi.number().required(),
//     reference: Joi.string().required(),
//     method_of_subscription: Joi.string()
//       .valid(...Object.values(MethodOfSub))
//       .required(),
//   }),
// };
//RSA Encrypted schema
const create = {
  body: Joi.object().keys({
    payload: Joi.any().required(),
  }),
};
//Raw schema for create
const createSchema = Joi.object().keys({
  amount: Joi.number().required(),
  reference: Joi.string().required(),
  method_of_subscription: Joi.string()
    .valid(...Object.values(MethodOfSub))
    .required(),
});

const createForUser = {
  params: Joi.object().keys({
    user_id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    payload: Joi.any().required(),
    // amount: Joi.number().required(),
    // reference: Joi.string().required(),
    // method_of_subscription: Joi.string().valid(...Object.values(MethodOfSub)),
  }),
};

export default {
  create,
  createSchema,
  findAllByUserId,
  createForUser,
};
