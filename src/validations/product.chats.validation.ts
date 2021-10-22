import Joi from "joi";
import { ChatStatus } from "../enum/product.chats.enum";

const findOne = {
  params: Joi.object().keys({
    product_chat_id: Joi.string().required(),
  }),
};

const findLatestForTwoUsers = {
  params: Joi.object().keys({
    second_user_id: Joi.string().required(),
  }),
};

const update = {
  params: Joi.object().keys({
    product_chat_id: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      product_id: Joi.string(),
      offer_product_id: Joi.string(),
      sender_id: Joi.string(),
      receiver_id: Joi.string(),
      sender_closed_deal: Joi.boolean(),
      receiver_closed_deal: Joi.boolean(),
      chat_status: Joi.string().valid(...Object.values(ChatStatus)),
    })
    .min(1),
};

const create = {
  body: Joi.object().keys({
    product_id: Joi.string().required(),
    offer_product_id: Joi.string(),
    sender_id: Joi.string(),
    receiver_id: Joi.string(),
    sender_closed_deal: Joi.boolean(),
    receiver_closed_deal: Joi.boolean(),
    chat_status: Joi.string()
      .valid(...Object.values(ChatStatus))
      .default(ChatStatus.OPEN),
  }),
};
const markCompleted = {
  params: Joi.object().keys({
    product_chat_id: Joi.string().required(),
  }),
  body: Joi.object().keys({}),
};

export default {
  create,
  update,
  findOne,
  findLatestForTwoUsers,
  markCompleted,
};
