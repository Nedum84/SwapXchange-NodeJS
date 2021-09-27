import { name, email, phone } from "./custom.validation";
import Joi from "joi";
import { UserRadius } from "../enum/user.enum";

const register = {
  body: Joi.object()
    .keys({
      uid: Joi.string().required(),
      name: Joi.string().custom(name).required(),
      // mobile_number: Joi.string().custom(phone),
      mobile_number: Joi.string(),
      email: Joi.string().custom(email),
      radius: Joi.number().default(UserRadius.MILE_200),
      address: Joi.string(),
      address_lat: Joi.number(),
      address_long: Joi.number(),
      state: Joi.string(),
      profile_photo: Joi.string(),
      device_token: Joi.string(),
      notification: Joi.object().keys({
        general: Joi.boolean().default(true),
        call: Joi.boolean().default(true),
        chat: Joi.boolean().default(true),
        product: Joi.boolean().default(true),
      }),
      user_level: Joi.number().default(1),
    })
    .min(3),
};

const refreshToken = {
  body: Joi.object().keys({
    refresh_token: Joi.string().required(),
  }),
};

export default {
  register,
  refreshToken,
};
