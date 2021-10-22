import { Request } from "express";
import httpStatus from "http-status";
import sequelize, { Category } from "../models";
import { QueryTypes } from "sequelize";
import { Op } from "sequelize";
import { ErrorResponse } from "../apiresponse/error.response";
import { CategoryAttributes } from "../models/category.model";
import ProductUtils from "../utils/product.utils";
import userService from "./user.service";
import { ProductStatus } from "../enum/product.enum";

const findOne = async (category_id: string) => {
  const cat = await Category.findOne({ where: { category_id } });

  if (!cat) {
    throw new ErrorResponse("Category not found", httpStatus.NOT_FOUND);
  }

  return cat;
};
const update = async (req: Request) => {
  const { category_id } = req.params;
  const body: CategoryAttributes = req.body;
  const { user_level } = req.user;
  if (!user_level || user_level == 1) {
    throw new ErrorResponse("Access denied", httpStatus.UNAUTHORIZED);
  }

  const category = await findOne(category_id);

  Object.assign(category, body);
  await category.save();
  return category.reload();
};
const create = async (req: Request) => {
  const body: CategoryAttributes = req.body;
  const { user_level } = req.user;
  if (!user_level || user_level == 1) {
    throw new ErrorResponse("Access denied", httpStatus.UNAUTHORIZED);
  }

  const category = await Category.create(body);
  return category;
};
const findAll = async (req: Request) => {
  const { user_id } = req.user;
  const user = await userService.findOne(user_id);
  // const categoriesz = await Category.findAll({ order: [["id", "DESC"]] });

  const query = `SELECT 
                  "Category".*, 
                  (SELECT COUNT(id) 
                    FROM "Product" 
                    WHERE "Product".product_status = '${ProductStatus.ACTIVE}'
                    AND "Product".category = "Category".category_id
                    AND ${ProductUtils.radiusGeometry(user)} < ${user.radius}
                  ) AS no_of_products

                  FROM "Category"
                  ORDER BY idx `;
  const categories: CategoryAttributes[] = await sequelize.query(query, {
    type: QueryTypes.SELECT,
    nest: true,
    mapToModel: true,
  });
  return categories;
};
const findByCatIds = async (catIds: string[]) => {
  const categories = await Category.findAll({
    where: {
      category_id: { [Op.in]: catIds }, //[1,2,3,4]
    },
    attributes: [
      "category_id",
      "category_name",
      "category_icon",
      "idx",
      "createdAt",
      "updatedAt",
    ],
  });

  return categories;
};

export default {
  update,
  findOne,
  create,
  findAll,
  findByCatIds,
};
