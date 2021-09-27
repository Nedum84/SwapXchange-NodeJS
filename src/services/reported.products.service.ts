import { Request, Response } from "express";
import httpStatus from "http-status";
import { ErrorResponse } from "../apiresponse/error.response";
import { ReportedProducts } from "../models/reported.products.model";
import Helpers from "../utils/helpers";
import productService from "./product.service";

const findOne = async (reported_id: string) => {
  const report = await ReportedProducts.findOne({ where: { reported_id } });
  if (!report) {
    throw new ErrorResponse("Not found", httpStatus.NOT_FOUND);
  }
  return report;
};
const update = async (req: Request) => {
  const { reported_id } = req.params;
  const { status } = req.body;
  const { user_level } = req.user;
  if (!user_level || user_level == 1) {
    throw new ErrorResponse("Access denied", httpStatus.UNAUTHORIZED);
  }
  const report = await findOne(reported_id);
  report.status = status;
  await report.save();
  return report.reload();
};
const create = async (req: Request) => {
  const { product_id, reported_message } = req.body;
  const { user_id: reported_by } = req.user;

  const product = await productService.findOne(product_id);

  const report = await ReportedProducts.create({
    reported_by,
    product_id,
    reported_message,
    uploaded_by: product.user_id,
  });
  return report;
};
const findByProductId = async (req: Request) => {
  const { status, product_id } = req.params;
  const product = await productService.findOne(product_id);

  const reports = await ReportedProducts.findAll({
    where: {
      status,
      product_id: product.product_id,
    },
  });
  return reports;
};
const findAll = async (req: Request) => {
  const paginateOptions = Helpers.getPaginate(req.params);
  const { status } = req.params;
  const where = status === "all" ? {} : { status };
  const reports = await ReportedProducts.findAll({
    where,
    order: [["id", "DESC"]],
    ...paginateOptions,
  });
  return reports;
};

export default {
  update,
  findOne,
  create,
  findAll,
  findByProductId,
};
