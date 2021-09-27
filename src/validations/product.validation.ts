import Joi from "joi";
import { ProductCondition, ProductStatus } from "../enum/product.enum";
import { paginateDefault } from "./custom.validation";

const findOne = {
  params: Joi.object().keys({
    product_id: Joi.string().required(),
  }),
};
const findAll = {
  params: Joi.object().keys(paginateDefault),
};
const findByCategory = {
  params: Joi.object().keys({
    category: Joi.string().required(),
    ...paginateDefault,
  }),
};
const findBySubCategory = {
  params: Joi.object().keys({
    subcategory: Joi.string().required(),
    filters: Joi.string()
      .default("newest")
      .valid("best-match", "price-high", "price-low", "newest", "oldest"),
    ...paginateDefault,
  }),
};
const findBySearch = {
  params: Joi.object().keys({
    search_query: Joi.string().required(),
    filters: Joi.string()
      .default(null)
      .valid("best-match", "price-high", "price-low", "newest", "oldest"),
    ...paginateDefault,
  }),
};
const findExchangeOptions = {
  params: Joi.object().keys({
    product_id: Joi.string().required(),
    ...paginateDefault,
  }),
};
const findMyProducts = {
  params: Joi.object().keys(paginateDefault),
};
const findNearUsers = {
  params: Joi.object().keys({
    product_id: Joi.string().required(),
  }),
};
const findSearchSuggestions = {
  params: Joi.object().keys({
    search_query: Joi.string().required(),
  }),
};
const findUserProducts = {
  params: Joi.object().keys({
    user_id: Joi.string().required(),
    filter: Joi.string()
      .default("all")
      .valid("all", ...Object.values(ProductStatus)),
    ...paginateDefault,
  }),
};

const update = {
  params: Joi.object().keys({
    product_id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    product_name: Joi.string().required(),
    category: Joi.string().required(),
    sub_category: Joi.string().required(),
    price: Joi.number().required(),
    product_description: Joi.string().required(),
    product_suggestion: Joi.array(),
    product_condition: Joi.string().valid(...Object.values(ProductCondition)),
    product_status: Joi.string()
      .required()
      .valid(...Object.values(ProductStatus)),
    user_address: Joi.string().required(),
    user_address_city: Joi.string().required(),
    user_address_lat: Joi.number().required(),
    user_address_long: Joi.number().required(),
  }),
};

const create = {
  body: Joi.object().keys({
    order_id: Joi.string().required(),
    product_name: Joi.string().required(),
    category: Joi.string().required(),
    sub_category: Joi.string().required(),
    price: Joi.number().required(),
    product_description: Joi.string().required(),
    product_suggestion: Joi.array().items(Joi.string().required()).required(),
    product_condition: Joi.string().valid(...Object.values(ProductCondition)),
    product_status: Joi.string()
      .required()
      .valid(...Object.values(ProductStatus)),
    user_address: Joi.string().required(),
    user_address_city: Joi.string().required(),
    user_address_lat: Joi.number().required(),
    user_address_long: Joi.number().required(),
    upload_price: Joi.number().default(100),
    images: Joi.array()
      .items(
        Joi.object().keys({
          image_path: Joi.string().required(),
          idx: Joi.number().default(200),
        })
      )
      .required(),
  }),
};

export default {
  create,
  update,
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
};
