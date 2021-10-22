import Joi from "joi";
import { BaseCurrency, OnlineStatus, UserRadius } from "../enum/user.enum";
import { password, phone, email, name } from "./custom.validation";

const updateUser = {
  body: Joi.object()
    .keys({
      uid: Joi.string(),
      name: Joi.string().custom(name),
      mobile_number: Joi.string(),
      email: Joi.string().custom(email),
      radius: Joi.number().valid(...Object.values(UserRadius)),
      address: Joi.string(),
      address_lat: Joi.number(),
      address_long: Joi.number(),
      state: Joi.string(),
      profile_photo: Joi.string(),
      device_token: Joi.string(),
      notification: Joi.object().keys({
        general: Joi.boolean(),
        call: Joi.boolean(),
        chat: Joi.boolean(),
        product: Joi.boolean(),
      }),
      // user_level: Joi.number(),
      // online_status: Joi.string().valid('away','offline',"online"),
      online_status: Joi.string().valid(...Object.values(OnlineStatus)),
      user_app_version: Joi.number(),
      base_currency: Joi.string().valid(...Object.values(BaseCurrency)),
      last_login: Joi.date(),
      suspended: Joi.boolean(),
      suspended_at: Joi.date(),
      un_suspended_at: Joi.date(),
      ip_ban: Joi.boolean(),
    })
    .min(1),
};
const updateAddress = {
  body: Joi.object()
    .keys({
      address: Joi.string().required(),
      address_lat: Joi.number().required(),
      address_long: Joi.number().required(),
      state: Joi.string(),
    })
    .min(3),
};
//by user_id or email
const getUser = {
  params: Joi.object().keys({
    user_id: Joi.string().required(),
  }),
};

export default {
  getUser,
  updateUser,
  updateAddress,
};
