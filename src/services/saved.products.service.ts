import { Request } from "express";
import httpStatus from "http-status";
import { ErrorResponse } from "../apiresponse/error.response";
import { SavedProducts } from "../models";
import Helpers from "../utils/helpers";
import productService from "./product.service";

const removeSaved = async (req: Request) => {
  const { user_id } = req.user;
  const { product_id } = req.params;

  const product = await productService.findOne(product_id);

  const save = await SavedProducts.findOne({
    where: { user_id, product_id: product.product_id },
  });

  if (!save) {
    throw new ErrorResponse("Product/User ID not found", httpStatus.NOT_FOUND);
  }

  await save.destroy();
  return "Product unsaved";
};
const findAllForUser = async (req: Request) => {
  const { user_id } = req.user;
  const paginateOptions = Helpers.getPaginate(req.params);
  const saved = await SavedProducts.findAll({
    where: { user_id },
    ...paginateOptions,
  });

  //get product string arr
  const products = saved.map((i) => i.product_id);
  return productService.findSavedProducts(products);
};
const checkSaved = async (user_id: string, product_id: string) => {
  const product = await productService.findOne(product_id);
  const save = await SavedProducts.findOne({
    where: { user_id, product_id: product.product_id },
  });

  if (!save) {
    return { is_saved: false };
  }
  return { is_saved: true };
};
const create = async (req: Request) => {
  const { user_id } = req.user;
  const { product_id } = req.body;

  const product = await productService.findOne(product_id);

  const saved = await checkSaved(user_id, product_id);
  if (saved.is_saved) {
    const added = await SavedProducts.findOne({
      where: { user_id, product_id: product.product_id },
    });
    return added!;
  }

  const save = await SavedProducts.create({
    product_id: product.product_id,
    user_id,
  });
  return save;
};

export default {
  removeSaved,
  findAllForUser,
  checkSaved,
  create,
};
