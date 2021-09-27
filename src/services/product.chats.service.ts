import { Request, Response } from "express";
import httpStatus from "http-status";
import { Op } from "sequelize";
import { ErrorResponse } from "../apiresponse/error.response";
import { ImageProduct } from "../models/image.product.model";
import { ProductChats } from "../models/product.chats.model";
import productService from "./product.service";
import userService from "./user.service";

const findOne = async (product_chat_id: string) => {
  const chat = await ProductChats.findOne({ where: { product_chat_id } });
  if (!chat) {
    throw new ErrorResponse("Not found", httpStatus.NOT_FOUND);
  }
  return chat;
};
const update = async (req: Request) => {
  const { product_chat_id } = req.params;
  const body = req.body;
  const { product_id, offer_product_id, sender_id, receiver_id } = body;
  const chat = await findOne(product_chat_id);
  //--> Products validations
  await productService.findOnlyById(product_id);
  if (offer_product_id) await productService.findOnlyById(offer_product_id);
  //--> Users
  await userService.findOne(sender_id);
  await userService.findOne(receiver_id);

  Object.assign(chat, body);
  await chat.save();
  return chat.reload();
};
const create = async (req: Request) => {
  const body = req.body;
  const { product_id, offer_product_id, sender_id, receiver_id } = body;

  //--> Products validations
  await productService.findOnlyById(product_id);
  if (offer_product_id) await productService.findOnlyById(offer_product_id);
  //--> Users
  await userService.findOne(sender_id);
  await userService.findOne(receiver_id);

  const chat = await ProductChats.create(body);
  return chat;
};

const findLatestForTwoUsers = async (req: Request) => {
  const { user_id } = req.user;
  const { second_user_id } = req.params;

  console.log(user_id, second_user_id);

  const findMatch = await ProductChats.findOne({
    where: {
      [Op.or]: [
        {
          receiver_id: user_id,
          sender_id: second_user_id,
        },
        {
          receiver_id: second_user_id,
          sender_id: user_id,
        },
      ],
    },
    order: [["id", "DESC"]],
    include: [
      {
        model: ImageProduct,
        as: "product_images",
        attributes: ["image_id", "image_path", "product_id", "idx"],
      },
      {
        model: ImageProduct,
        as: "product_offer_images",
        attributes: ["image_id", "image_path", "product_id", "idx"],
      },
    ],
  });
  if (!findMatch) {
    throw new ErrorResponse("No product chat found!", httpStatus.NOT_FOUND);
  }
  return findMatch;
};
const findAll = async () => {
  const findMatchs = await ProductChats.findAll({
    limit: 30,
    order: [["id", "DESC"]],
    include: [
      {
        model: ImageProduct,
        as: "product_images",
        attributes: ["image_id", "image_path", "product_id", "idx"],
      },
      {
        model: ImageProduct,
        as: "product_offer_images",
        attributes: ["image_id", "image_path", "product_id", "idx"],
      },
    ],
  });
  return findMatchs;
};

export default {
  update,
  findOne,
  create,
  findLatestForTwoUsers,
  findAll,
};
