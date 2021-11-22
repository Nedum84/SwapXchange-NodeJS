import { Request } from "express";
import httpStatus from "http-status";
import sequelize, { SubCategory } from "../models";
import { ErrorResponse } from "../apiresponse/error.response";
import { SubCategoryAttributes } from "../models/subcategory.model";
import ProductUtils from "../utils/product.utils";
import { ProductStatus } from "../enum/product.enum";
import { QueryTypes } from "sequelize";
import userService from "./user.service";
import categoryService from "./category.service";
import randomString from "../utils/random.string";

const findOne = async (sub_category_id: string) => {
  const subCat = await SubCategory.findOne({ where: { sub_category_id } });

  if (!subCat) {
    throw new ErrorResponse("sub category not found", httpStatus.NOT_FOUND);
  }

  return subCat;
};
const update = async (req: Request) => {
  const { sub_category_id } = req.params;
  const body: SubCategoryAttributes = req.body;

  const { user_level } = req.user;
  if (!user_level || user_level == 1) {
    throw new ErrorResponse("Access denied", httpStatus.UNAUTHORIZED);
  }
  const category = await findOne(sub_category_id);

  Object.assign(category, body);
  await category.save();
  return category.reload();
};
const create = async (req: Request) => {
  const body: SubCategoryAttributes = req.body;

  const { user_level } = req.user;
  if (!user_level || user_level == 1) {
    throw new ErrorResponse("Access denied", httpStatus.UNAUTHORIZED);
  }
  await categoryService.findOne(body.category_id);

  body.sub_category_id = await randomString.generateUniqueCharsForColumn(
    SubCategory,
    "sub_category_id"
  );
  const category = await SubCategory.create(body);
  return category;
};
const findAll = async (req: Request) => {
  const { user_id } = req.user;
  const user = await userService.findOne(user_id);

  const query = `SELECT 
                  "SubCategory".*, 
                  (SELECT COUNT(id) 
                    FROM "Product" 
                    WHERE "Product".product_status = '${ProductStatus.ACTIVE}'
                    AND "Product".sub_category = "SubCategory".sub_category_id
                    AND ${ProductUtils.radiusGeometry(user)} < ${user.radius}
                  ) AS no_of_products

                  FROM "SubCategory"
                  ORDER BY idx `;
  const subcategories: SubCategoryAttributes[] = await sequelize.query(query, {
    type: QueryTypes.SELECT,
    nest: true,
    mapToModel: true,
  });
  console.log(subcategories); //Remove later
  return subcategories;
};
const findByCategoryId = async (category_id: string) => {
  const categories = await SubCategory.findAll({
    where: { category_id },
    order: [["id", "DESC"]],
  });
  return categories;
};

export default {
  update,
  findOne,
  create,
  findAll,
  findByCategoryId,
};
