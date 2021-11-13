import { Request } from "express";
import httpStatus from "http-status";
import { ErrorResponse } from "../apiresponse/error.response";
import { AmountsEnum, MethodOfSub } from "../enum/coins.enum";
import { User } from "../models";
import { UserAttributes } from "../models/user.model";
import coinsService from "./coins.service";
import randomString from "../utils/random.string";
import config from "../config/config";

const createUser = async (body: UserAttributes) => {
  const { uid, email } = body;

  console.log("ENV::", config);

  const user = await User.findOne({ where: { uid } });
  if (user) {
    user.last_login = new Date();
    await user.save();
    return user.reload();
  }
  if (email) {
    // Check if is Email is taken
    const isEmailTaken = await User.findOne({
      where: { email },
    });
    if (email && !!isEmailTaken) {
      throw new ErrorResponse("Email already taken");
    }
  }
  body.user_id = await randomString.generateUniqueCharsForColumn(
    User,
    "user_id",
    10,
    "numeric"
  );
  const newUser = await User.create(body);

  //Add Registration Coins Bonus
  const amount = AmountsEnum.H500;
  const reference = `${newUser.uid}-${newUser.user_id}`;
  const method_of_subscription = MethodOfSub.REGISTRATION;
  const data = {
    amount,
    reference,
    method_of_subscription,
    user_id: newUser.user_id,
  };

  const coin = await coinsService.create(data);
  return newUser;
};

const findMe = async (user_id: string) => {
  const user = await User.findOne({ where: { user_id } });
  if (!user) {
    throw new ErrorResponse("Detail not found");
  }
  return user;
};
const findOne = async (user_id: string) => {
  const user = await User.findOne({ where: { user_id } });
  if (!user) {
    throw new ErrorResponse("user not found", httpStatus.NOT_FOUND);
  }
  return user;
};
const updateUser = async (req: Request) => {
  const { user_id } = req.user;
  const body: UserAttributes = req.body;

  const user = await findOne(user_id);
  Object.assign(user, body);
  await user.save();
  return user.reload();
};
const updateUserAddress = async (req: Request) => {
  const { user_id } = req.user;
  const body: UserAttributes = req.body;

  const user = await findOne(user_id);
  Object.assign(user, body);
  await user.save();
  return user.reload();
};

export default {
  createUser,
  findMe,
  findOne,
  updateUser,
  updateUserAddress,
};
