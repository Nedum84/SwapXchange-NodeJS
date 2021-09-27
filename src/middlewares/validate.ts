import Joi, { ObjectSchema } from "joi";
import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../apiresponse/error.response";

const validate =
  (schema: any) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ["params", "query", "body"]);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: "key" } })
      .validate(object);

    if (error) {
      let errorMessage: string;
      if (error.details.length > 0) {
        errorMessage = error.details
          .map((details) => details.message)
          .join(", ");
      } else {
        errorMessage = error.details?.[0].message;
      }

      return next(new ErrorResponse(errorMessage, httpStatus.BAD_REQUEST));
    }
    Object.assign(req, value);
    return next();
  };
/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
interface MapKey {
  [key: string]: string | undefined;
}
const pick = (object: any, keys: string[]) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      (obj as MapKey)[key] = object[key];
    }
    return obj;
  }, {});
};

export = validate;
