import jwt from "jsonwebtoken";
import config from "../config/config";
import moment from "moment";
import httpStatus from "http-status";
import { ErrorResponse } from "../apiresponse/error.response";
import { UserAttributes } from "../models/user.model";
import userService from "./user.service";
import { TokenTypes } from "../enum/token.enum";
import { Token } from "../models";

/**
 * Generate token
 * @param {Object} data
 * @param {Moment} expires
 * @returns {string}
 */
const generateToken = (
  data: object,
  expires: moment.Moment,
  tokenType: TokenTypes,
  secret = config.jwt.secret
): string => {
  const payload = {
    user: data,
    iat: moment().unix(),
    exp: expires.unix(),
    type: tokenType,
  };

  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {int} user_id
 * @param {string} uuid
 * @param {Moment} expires
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (
  token: string,
  user_id: string,
  expires: moment.Moment,
  tokenType: TokenTypes
) => {
  const tk = await Token.findOne({
    where: { user_id: user_id, type: tokenType },
  });
  if (tk) {
    tk.token = token;
    tk.expires = expires.toDate();
    // tk.blacklisted = blacklisted ?? false;
    await tk.save();
    await tk.reload();
    return tk;
  }

  const tokenDoc = await Token.create({
    token,
    user_id,
    expires: expires.toDate(),
    type: tokenType,
  });
  return tokenDoc;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} secret
 * @returns {Promise<Token>}
 */
const verifyToken = async (token: string, tokenType: TokenTypes) => {
  const payload = jwt.verify(token, config.jwt.secret) as any;

  if (payload == null) {
    throw new ErrorResponse("Invalid or Expired token");
  }
  const tokenDoc = await Token.findOne({
    where: {
      token,
      type: tokenType,
      user_id: payload!.user!.user_id,
    },
  });

  if (!tokenDoc) {
    throw new ErrorResponse("Token not found", httpStatus.NOT_FOUND);
  }
  return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user: UserAttributes) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    // 900000000,
    "minutes"
  );
  const accessToken = generateToken(
    { user_id: user.user_id, user_level: user.user_level },
    accessTokenExpires,
    TokenTypes.ACCESS
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    "days"
  );
  const refreshToken = generateToken(
    { user_id: user.user_id, user_level: user.user_level },
    refreshTokenExpires,
    TokenTypes.REFRESH
  );

  await saveToken(
    refreshToken,
    user.user_id,
    refreshTokenExpires,
    TokenTypes.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

const refreshToken = async (refresh_token: string) => {
  const verified = await verifyToken(refresh_token, TokenTypes.REFRESH);
  if (!verified) {
    throw new ErrorResponse("Refresh Token not found", httpStatus.NOT_FOUND);
  }

  const user = await userService.findOne(verified.user_id);

  return generateAuthTokens(user);
};

export = {
  generateToken,
  generateAuthTokens,
  saveToken,
  verifyToken,
  refreshToken,
};
