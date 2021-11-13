import { Request } from "express";
import httpStatus from "http-status";
import sequelize from "../models";
import { ErrorResponse } from "../apiresponse/error.response";
import { ImageProduct, Product } from "../models";
import { ImageProductAttributes } from "../models/image.product.model";
import productService from "./product.service";
import { QueryTypes } from "sequelize";
import { Sequelize } from "sequelize";
import randomString from "../utils/random.string";

const findOne = async (image_id: string) => {
  const image = await ImageProduct.findOne({
    where: { image_id },
    include: { model: Product, as: "product" },
  });
  if (!image) {
    throw new ErrorResponse("Image not found!", httpStatus.NOT_FOUND);
  }
  return image;
};
const findAll = async (product_id: string) => {
  const images = await ImageProduct.findAll({ where: { product_id } });
  return images;
};
const deleteOne = async (req: Request) => {
  const { image_id } = req.params;
  const { user_id } = req.user;
  const image = await findOne(image_id);
  const product = await productService.findOnlyById(image.product_id);

  if (product.user_id !== user_id) {
    throw new ErrorResponse(
      "No permission to delete image",
      httpStatus.FORBIDDEN
    );
  }
  return !!image.destroy();
};
const createMany = async (body: ImageProductAttributes[]) => {
  const images = await ImageProduct.bulkCreate(body, {
    fields: ["image_id", "product_id", "image_path", "idx"],
    updateOnDuplicate: ["image_id"],
  });
  return images;
};
const createOne = async (body: ImageProductAttributes) => {
  body.image_id = await randomString.generateUniqueCharsForColumn(
    ImageProduct,
    "image_id"
  );
  const image = await ImageProduct.create(body);
  return image;
};
const update = async (req: Request) => {
  const { image_id } = req.params;
  const { idx } = req.body;

  const image = await findOne(image_id);

  //increment others by 1
  const updateOthers = await ImageProduct.update(
    // { idx: Sequelize.literal("idx + 1") },
    { idx: Sequelize.fn("1 + ", Sequelize.col("idx")) },
    { where: { product_id: image.product_id } }
  );

  image.idx = idx;
  await image.save();
  return image.reload();
};

export default {
  findAll,
  findOne,
  createMany,
  createOne,
  update,
  deleteOne,
};
