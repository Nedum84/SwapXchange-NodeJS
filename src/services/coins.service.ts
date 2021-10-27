import { Request, Response } from "express";
import { dangerouslyDisableDefaultSrc } from "helmet/dist/middlewares/content-security-policy";
import httpStatus from "http-status";
import moment from "moment";
import { Sequelize } from "sequelize";
import { Op } from "sequelize";
import { ErrorResponse } from "../apiresponse/error.response";
import { AmountsEnum, MethodOfSub } from "../enum/coins.enum";
import sequelize, { Coins, Product } from "../models";
import CONSTANTS from "../utils/constants";
import { verifyReference } from "../utils/request";
import userService from "./user.service";

const findAllByUserId = async (user_id: string, limit = 10) => {
  const user = await userService.findOne(user_id);
  const coinsMeta = await Coins.findAll({
    where: {
      [Op.or]: [{ user_id: user.user_id }, { reference: user.user_id }],
    },
    limit,
    order: [["id", "DESC"]],
  });
  const balance = await getBalance(user_id);
  return {
    ...balance,
    meta: coinsMeta,
  };
};
const create = async (data: any) => {
  const { amount, reference, method_of_subscription, user_id } = data;

  const checkRef = await Coins.findOne({ where: { reference } });
  if (checkRef) {
    throw new ErrorResponse("Duplicate transaction ref not allowed");
  }

  const allowedMethods = [
    MethodOfSub.REGISTRATION,
    MethodOfSub.PURCHASE,
    MethodOfSub.DAILY_OPENING,
  ];
  if (!allowedMethods.includes(method_of_subscription)) {
    throw new ErrorResponse("Method of subscription not allowed currently");
  }
  if (method_of_subscription === MethodOfSub.REGISTRATION) {
    const checkBonus = await Coins.findOne({
      where: { user_id, method_of_subscription },
    });
    if (checkBonus) {
      throw new ErrorResponse("User already claimed registration bonus");
    }
  }
  if (method_of_subscription === MethodOfSub.PURCHASE) {
    const verifyRef = await verifyReference(reference);
    if (!verifyRef) {
      throw new ErrorResponse("Invalid reference");
    }
  }
  if (method_of_subscription === MethodOfSub.DAILY_OPENING) {
    const checkReward = await Coins.findOne({
      where: {
        user_id,
        method_of_subscription,
        createdAt: {
          [Op.gte]: moment().startOf("day").toDate(),
        },
      },
    });
    if (checkReward) {
      throw new ErrorResponse(
        "You can't receive daily coins twice per day. try again tomorrow"
      );
    }
  }
  const amounts = Object.values(AmountsEnum);
  if (method_of_subscription === MethodOfSub.PURCHASE) {
    if (!amounts.includes(amount)) {
      throw new ErrorResponse("Invalid amount for this reference::1");
    }

    //XPCOHN6CDN_5000_31_2300-> rand_no, coin_amount, user_id, purchased_amount
    const purchaseAmounts: any[] = reference.split("_");

    if (purchaseAmounts.length < 3) {
      throw new ErrorResponse("Invalid reference number");
    }

    if (purchaseAmounts?.[2]!==user_id) {
      throw new ErrorResponse("Reference doesn't belong to this user.");
    }
    const coinsAmount = parseInt(purchaseAmounts[1]);
    if (coinsAmount !== amount) {
      throw new ErrorResponse("Invalid amount for this reference::2");
    }
  }

  //--> CREATE COIN
  const coin = await Coins.create({
    user_id,
    amount,
    reference,
    method_of_subscription,
  });
  // return coin;
  return getBalance(user_id);
};

const createForUser = async (req: Request) => {
  const { user_level } = req.user;
  const { user_id } = req.params;

  if (!user_level || user_level == 1) {
    throw new ErrorResponse("Access denied", httpStatus.UNAUTHORIZED);
  }

  const user = await userService.findOne(user_id);

  const coin = await create({ user_id: user.user_id, ...req.body }); //...amount, reference, method_of_subscription
  return coin;
};
const getBalance = async (user_id: string) => {
  //--> ADDED COINS
  const userCoins = await Coins.findAll({
    where: { user_id },
    attributes: [[Sequelize.fn("sum", Sequelize.col("amount")), "total_coins"]],
    raw: true,
  });
  //@ts-ignore
  const userTotalCoins = parseInt(userCoins[0]?.total_coins ?? 0);
  //--> PRODUCT UPLOADED PRICE
  const uploadAmount = await Product.findAll({
    where: { user_id },
    attributes: [
      [
        Sequelize.fn("sum", Sequelize.col("upload_price")),
        "total_upload_amount",
      ],
    ],
    raw: true,
  });
  //@ts-ignore
  const totalUploadAmount = parseInt(uploadAmount[0]?.total_upload_amount ?? 0);
  //--> TOTAL TRANSFERS
  const transfers = await Coins.findAll({
    where: { reference: user_id },
    attributes: [
      [Sequelize.fn("sum", Sequelize.col("amount")), "total_transfers"],
    ],
    raw: true,
  });
  //@ts-ignore
  const totalTransfers = parseInt(transfers[0]?.total_transfers ?? 0);
  const last_credit = await Coins.findOne({
    where: { user_id },
    limit: 1,
    order: [["id", "DESC"]],
  });
  //@ts-ignore
  last_credit?.current_time = CONSTANTS.NOW;
  const balance = userTotalCoins - totalUploadAmount - totalTransfers;

  return {
    total_coins: userTotalCoins,
    total_upload_amount: totalUploadAmount,
    total_transfers: totalTransfers,
    balance,
    last_credit,
  };
};

export default {
  findAllByUserId,
  create,
  createForUser,
  getBalance,
};
