import { Request } from "express";
import httpStatus from "http-status";
import { Sequelize } from "sequelize";
import { Op } from "sequelize";
import { QueryTypes } from "sequelize";
import { ErrorResponse } from "../apiresponse/error.response";
import { ProductStatus } from "../enum/product.enum";
import sequelize, {
  Category,
  ImageProduct,
  Product,
  SubCategory,
  User,
} from "../models";
import { ProductAttributes } from "../models/product.model";
import Helpers from "../utils/helpers";
import ProductUtils from "../utils/product.utils";
import randomString from "../utils/random.string";
import UserUtils from "../utils/user.utils";
import categoryService from "./category.service";
import productImageService from "./product.image.service";
import productViewsService from "./product.views.service";
import subcategoryService from "./subcategory.service";
import userService from "./user.service";

const findOnlyById = async (product_id: string) => {
  const product = await Product.findOne({
    where: { product_id },
  });
  if (!product) {
    throw new ErrorResponse("Product not found!", httpStatus.NOT_FOUND);
  }
  return product;
};
const findOne = async (product_id: string) => {
  const product = await Product.findOne({
    where: { product_id },
    ...ProductUtils.sequelizeFindOptions({ limit: 1, offset: 0 }),
  });
  if (!product) {
    throw new ErrorResponse("Product not found!", httpStatus.NOT_FOUND);
  }
  return product;
};
const update = async (req: Request) => {
  const { product_id } = req.params;
  const { user_id } = req.user;
  const body: ProductAttributes = req.body;

  const product = await findOne(product_id);

  if (product.user_id != user_id) {
    throw new ErrorResponse(
      "You are not authorized to edit this product",
      httpStatus.UNAUTHORIZED
    );
  }

  Object.assign(product, body);
  await product.save();
  // return product.reload();
  return findOne(product.product_id);
};
const create = async (req: Request) => {
  const { user_id } = req.user;
  const body = req.body;
  body.user_id = user_id;

  body.order_id = await randomString.generateProductOrderId();
  body.product_id = await randomString.generateUniqueCharsForColumn(
    Product,
    "product_id"
  );

  const product = await Product.create(body);
  //--> Add Images....
  if (body?.images) {
    const imgs = body.images
      .filter((img: any) => img.image_path !== "")
      .map((img: any, index: number) => {
        return {
          image_path: img.image_path,
          product_id: product.product_id,
          idx: img.idx ?? index + 1,
        };
      });
    if (imgs.length !== 0) {
      const images = await productImageService.createMany(imgs);
      product.images = images;
    }
  }

  // return product;
  return findOne(product.product_id);
};
const findByCategory = async (req: Request) => {
  const { user_id } = req.user;
  const { category } = req.params;
  const options = Helpers.getPaginate(req.query);

  const cat = await categoryService.findOne(category);

  const extra = `AND category = '${cat.category_id}'`;
  const query = await ProductUtils.selectQuery({ user_id, ...options, extra });

  const products: ProductAttributes[] = await sequelize.query(query, {
    type: QueryTypes.SELECT,
    nest: true,
    mapToModel: true,
  });

  return products;
};
const findBySubCategory = async (req: Request) => {
  const { user_id } = req.user;
  const { subcategory } = req.params;
  const options = Helpers.getPaginate(req.query);

  const sub_cat = await subcategoryService.findOne(subcategory);

  const extra = `AND sub_category = '${sub_cat.sub_category_id}'`;
  const query = await ProductUtils.selectQuery({ user_id, ...options, extra });

  const products: ProductAttributes[] = await sequelize.query(query, {
    type: QueryTypes.SELECT,
    nest: true,
    mapToModel: true,
  });

  return products;
};
const findBySearch = async (req: Request) => {
  const { user_id } = req.user;
  const { search_query, filters } = req.query;
  const options = Helpers.getPaginate(req.query);

  const searchQuery = search_query != "none" ? search_query : "";
  const extra = ` 
      AND (
            product_name LIKE '%${searchQuery}%' 
          OR category IN 
              (SELECT category_id FROM "Category" WHERE category_name LIKE '%${searchQuery}%' ) 
          OR sub_category IN 
              (SELECT sub_category_id FROM "SubCategory" WHERE sub_category_name LIKE '%${searchQuery}%' ) 
      )
`;
  let order;
  if (filters) {
    switch (filters) {
      case "best-match":
        order = "ORDER BY id DESC";
        break;
      case "price-high":
        order = "ORDER BY price DESC";
        break;
      case "price-low":
        order = "ORDER BY price ASC";
        break;
      case "newest":
        order = "ORDER BY id DESC";
        break;
      case "oldest":
        order = "ORDER BY id ASC";
        break;

      default:
        order = "ORDER BY id DESC";
        break;
    }
  }
  const query = await ProductUtils.selectQuery({
    user_id,
    ...options,
    extra,
    filters,
    order,
  });

  const products: ProductAttributes[] = await sequelize.query(query, {
    type: QueryTypes.SELECT,
    nest: true,
    mapToModel: true,
  });

  return products;
};
const findSearchSuggestions = async (req: Request) => {
  const { search_query } = req.query;
  const query = `SELECT DISTINCT product_name as item FROM "Product" WHERE product_name LIKE '%${search_query}%'
              UNION
            SELECT DISTINCT category_name as item FROM "Category" WHERE category_name LIKE '%${search_query}%'
              UNION
            SELECT DISTINCT sub_category_name as item FROM "SubCategory" WHERE sub_category_name LIKE '%${search_query}%'
        `;
  const result = await sequelize.query(query, {
    type: QueryTypes.SELECT,
    nest: true,
    mapToModel: true,
  });
  return result;
};
const findExchangeOptions = async (req: Request) => {
  const { user_id } = req.user;
  const { product_id } = req.params;
  const options = Helpers.getPaginate(req.query);
  const product = await findOne(product_id);
  const suggestions = product.product_suggestion.map((i) => `'${i}'`);

  const extra = `AND product_id != '${product.product_id}' 
                  AND user_id != '${product.user_id}' 
                    AND category = ANY(ARRAY[${suggestions}])`;
  const query = await ProductUtils.selectQuery({ user_id, ...options, extra });

  const products: ProductAttributes[] = await sequelize.query(query, {
    type: QueryTypes.SELECT,
    nest: true,
    mapToModel: true,
  });

  return products;
};
const findMyProducts = async (req: Request) => {
  const { user_id } = req.user;
  const { limit, offset } = Helpers.getPaginate(req.query);
  const { filters } = req.query; //...ProductStatus,all

  const query = `SELECT "Product".*, 
                  ${ProductUtils.noOfViewsSubQuery()}, 
                  ${ProductUtils.imgSubQuery()}, 
                  ${ProductUtils.userSubQuery()}, 
                  ${ProductUtils.suggestionSubQuery()}
                  FROM "Product"
                      WHERE "Product".user_id = '${user_id}'
                          ORDER BY id DESC
                              LIMIT ${limit} OFFSET ${offset} `;

  const products: ProductAttributes[] = await sequelize.query(query, {
    type: QueryTypes.SELECT,
    nest: true,
    mapToModel: true,
  });

  return products;
};
const findUserProducts = async (req: Request) => {
  const { user_id } = req.params;
  const { filters } = req.query;
  const { limit, offset } = Helpers.getPaginate(req.query);
  const extra =
    filters == "all" || !filters ? "" : `AND product_status = '${filters}'`;

  const user = await userService.findOne(user_id);

  const query = `SELECT "Product".*,
                  ${ProductUtils.noOfViewsSubQuery()}, 
                  ${ProductUtils.imgSubQuery()}, 
                  ${ProductUtils.userSubQuery()}, 
                  ${ProductUtils.suggestionSubQuery()}
                  FROM "Product" 
                      WHERE "Product".user_id = '${user.user_id}' 
                        ${extra}
                          ORDER BY id DESC 
                              LIMIT ${limit} OFFSET ${offset} `;

  const products: ProductAttributes[] = await sequelize.query(query, {
    type: QueryTypes.SELECT,
    nest: true,
    mapToModel: true,
  });

  return products;
};

const findNearUsers = async (req: Request) => {
  const { user_id } = req.user;
  const { product_id } = req.params;

  const user = await userService.findOne(user_id);
  const { user_address_lat: lat, user_address_long: long } = await findOne(
    product_id
  );

  const query = `SELECT user_id, device_token, notification, name
            from "User" 
            WHERE ${UserUtils.radiusGeometry(lat, long)} < ${user.radius} 
            AND "User".user_id != '${user_id}'
            LIMIT 100
        `;
  const result = await sequelize.query(query, {
    type: QueryTypes.SELECT,
    nest: true,
    mapToModel: true,
  });
  return result;
};
const findAll = async (req: Request) => {
  // await sequelize.query(`DELETE FROM "Product" `);
  const { user_id } = req.user;
  const options = Helpers.getPaginate(req.query);

  const query = await ProductUtils.selectQuery({ user_id, ...options });

  const products: ProductAttributes[] = await sequelize.query(query, {
    type: QueryTypes.SELECT,
    nest: true,
    mapToModel: true,
  });

  return products;
};
const findSavedProducts = async (prods: Array<string>) => {
  const products = await Product.findAll({
    where: {
      product_id: { [Op.in]: prods }, //[1,2,3,4]
    },
    ...ProductUtils.sequelizeFindOptions({ limit: 100, offset: 0 }), //anything large for lim&offset(NOT even needed here)
  });

  return products;
};
const markCompletedProducts = async (prods: Array<string>) => {
  const [num, products] = await Product.update(
    { product_status: ProductStatus.COMPLETED },
    {
      where: { product_id: { [Op.in]: prods } },
    }
  );

  return products;
};

export default {
  findOnlyById,
  findOne,
  findAll,
  findByCategory,
  findBySubCategory,
  findBySearch,
  findExchangeOptions,
  findMyProducts,
  findNearUsers,
  findSearchSuggestions,
  findUserProducts,
  update,
  create,
  findSavedProducts,
  markCompletedProducts,
};
