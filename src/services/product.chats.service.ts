import { Request, Response } from "express";
import httpStatus from "http-status";
import { Op } from "sequelize";
import { ErrorResponse } from "../apiresponse/error.response";
import { ChatStatus } from "../enum/product.chats.enum";
import { ProductChats } from "../models";
import productImageService from "./product.image.service";
import productService from "./product.service";
import userService from "./user.service";

const findOne = async (product_chat_id: string) => {
  const chat = await ProductChats.findOne({ where: { product_chat_id } });
  if (!chat) {
    throw new ErrorResponse("Chat not found", httpStatus.NOT_FOUND);
  }
  //get images
  const product_images = await productImageService.findAll(chat.product_id);
  const product_offer_images = await productImageService.findAll(
    chat.offer_product_id
  );
  if (product_images) {
    //@ts-ignore no_of_views
    chat.setDataValue("product_images", product_images);
  }
  if (product_images) {
    //@ts-ignore no_of_views
    chat.setDataValue("product_offer_images", product_offer_images);
  }
  return chat;
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

  //--> Check if I have already established connection with this user's product
  const chat = await ProductChats.findOne({
    where: { product_id, sender_id }, //person's pid & me being the sender
    order: [["id", "DESC"]],
  });

  console.log(chat?.toJSON(), sender_id, req.user);

  //create
  if (!chat) {
    const newChat = await ProductChats.create(body);
    return findOne(newChat.product_chat_id);
  }
  //update
  Object.assign(chat, body);
  await chat.save();
  await chat.reload();
  return findOne(chat.product_chat_id);
};

const update = async (req: Request) => {
  const { product_chat_id } = req.params;
  const body = req.body;
  const { product_id, offer_product_id, sender_id, receiver_id } = body;
  const chat = await findOne(product_chat_id);
  //--> Products validations
  await productService.findOnlyById(product_id);
  if (offer_product_id) await productService.findOnlyById(offer_product_id);
  //--> Users validation
  await userService.findOne(sender_id);
  await userService.findOne(receiver_id);

  Object.assign(chat, body);
  await chat.save();
  await chat.reload();
  // return chat.reload();
  return findOne(chat.product_chat_id);
};

const findLatestForTwoUsers = async (req: Request) => {
  const { user_id } = req.user;
  const { second_user_id } = req.params;

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
  });
  if (!findMatch) {
    throw new ErrorResponse("No product chat found!", httpStatus.NOT_FOUND);
  }
  const product_images = await productImageService.findAll(
    findMatch.product_id
  );
  const product_offer_images = await productImageService.findAll(
    findMatch.offer_product_id
  );

  if (product_images) {
    //@ts-ignore no_of_views
    findMatch.setDataValue("product_images", product_images);
  }
  if (product_images) {
    //@ts-ignore no_of_views
    findMatch.setDataValue("product_offer_images", product_offer_images);
  }
  return findMatch;
};
const findAll = async () => {
  const findMatchs = await ProductChats.findAll({
    limit: 30,
    order: [["id", "DESC"]],
  });
  return findMatchs;
};
//Mark products as completed
const markCompleted = async (req: Request) => {
  const { product_chat_id } = req.params;
  const { user_id } = req.user;

  const chat = await findOne(product_chat_id);
  const { product_id, offer_product_id, sender_id, receiver_id } = chat;

  if (!offer_product_id) {
    throw new ErrorResponse("No offer product found!", httpStatus.NOT_FOUND);
  }
  if (![sender_id, receiver_id].includes(user_id)) {
    throw new ErrorResponse(
      "Unauthorized to carry out this action",
      httpStatus.UNAUTHORIZED
    );
  }

  chat.chat_status = ChatStatus.EXCHANGED;
  chat.sender_closed_deal = true;
  chat.receiver_closed_deal = true;
  await chat.save();

  const products = [product_id, offer_product_id];
  return productService.markCompletedProducts(products);
};

export default {
  update,
  findOne,
  create,
  findLatestForTwoUsers,
  findAll,
  markCompleted,
};
