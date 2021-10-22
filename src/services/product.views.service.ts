import { Request, Response } from "express";
import { ProductViews } from "../models";
import productService from "./product.service";

const findAll = async (product_id: string) => {
  const product = await productService.findOnlyById(product_id);

  const views = await ProductViews.count({
    where: { product_id: product.product_id },
  });

  return views;
};
const create = async (req: Request) => {
  const { user_id } = req.user;
  const { product_id } = req.body;
  const view = await ProductViews.findOne({ where: { user_id, product_id } });

  if (view) {
    await view.save();
    return view.reload();
  }

  const newView = await ProductViews.create({
    user_id,
    product_id,
  });
  return newView;
};

export default {
  findAll,
  create,
};
