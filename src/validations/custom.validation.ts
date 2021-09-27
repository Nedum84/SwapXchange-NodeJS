import Joi from "joi";

const password = (value: string, helpers: any) => {
  if (value.length < 6) {
    return helpers.message("password must be at least 6 characters");
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message(
      "password must contain at least 1 letter and 1 number"
    );
  }
  return value;
};
const email = (value: string, helpers: any) => {
  const emailRex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!value.match(emailRex)) {
    return helpers.message("Invalid email address");
  }
  return value;
};
const phone = (value: string, helpers: any) => {
  if (value.length < 11 || value.length > 11) {
    return helpers.message("Phone must be 11 characters");
  }
  if (!value.match(/[789][01][0-9]{8}$/)) {
    return helpers.message(
      "password must contain at least 1 letter and 1 number"
    );
  }
  return value;
};
const name = (value: string, helpers: any) => {
  if (value.split(" ").length < 2) {
    return helpers.message("Full name required");
  }
  return value;
};

export const paginateDefault = {
  limit: Joi.number().default(10),
  offset: Joi.number().default(0),
};
export { password, phone, email, name };
