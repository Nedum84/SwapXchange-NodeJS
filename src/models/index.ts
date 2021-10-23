"use strict";
import { Sequelize } from "sequelize";
import dbConfig from "../database/config/db.config";
import config from "../config/config";
import pg from "pg";
import { UserFactory } from "./user.model";
import { AppSettingsFactory } from "./app.settings.model";
import { CategoryFactory } from "./category.model";
import { CoinsFactory } from "./coins.model";
import { FaqsFactory } from "./faqs.model";
import { FeedbackFactory } from "./feedback.model";
import { ImageProductFactory } from "./image.product.model";
import { ProductChatsFactory } from "./product.chats.model";
import { ProductFactory } from "./product.model";
import { ProductViewsFactory } from "./product.views.model";
import { ReportedProductsFactory } from "./reported.products.model";
import { SavedProductsFactory } from "./saved.products.model";
import { SubCategoryFactory } from "./subcategory.model";
import { TokenFactory } from "./token.model";
pg.defaults.parseInt8 = true; //Convert Int returned as strings to Int...
// require("pg").defaults.parseInt8 = true; //Convert Int returned as strings to Int...

// @ts-ignore
const database = dbConfig[config.env] || dbConfig.development;
const sequelize = new Sequelize(
  database.dbname,
  database.username,
  database.password,
  {
    ...database,
    dialect: database.dialect,
  }
);

export const AppSettings = AppSettingsFactory(sequelize);
export const Category = CategoryFactory(sequelize);
export const Coins = CoinsFactory(sequelize);
export const Faqs = FaqsFactory(sequelize);
export const Feedback = FeedbackFactory(sequelize);
export const ImageProduct = ImageProductFactory(sequelize);
export const ProductChats = ProductChatsFactory(sequelize);
export const Product = ProductFactory(sequelize);
export const ProductViews = ProductViewsFactory(sequelize);
export const ReportedProducts = ReportedProductsFactory(sequelize);
export const SavedProducts = SavedProductsFactory(sequelize);
export const SubCategory = SubCategoryFactory(sequelize);
export const Token = TokenFactory(sequelize);
export const User = UserFactory(sequelize);
//-->Category Relationship
Category.hasMany(Product, {
  as: "products",
  foreignKey: "category",
  sourceKey: "category_id",
});
//--> Coins Relationship
Coins.belongsTo(User, {
  as: "user",
  onDelete: "cascade",
  foreignKey: "user_id",
});
ImageProduct.belongsTo(Product, {
  as: "product",
  foreignKey: "product_id",
  targetKey: "product_id",
});
//--> ProductChats Relationship
// ProductChats.hasMany(ImageProduct, {
//   as: "product_images",
//   // onDelete: "cascade",
//   foreignKey: "product_id", //image product
//   sourceKey: "product_id", // product chats
// });
// ProductChats.hasMany(ImageProduct, {
//   as: "product_offer_images",
//   // onDelete: "cascade",
//   foreignKey: "product_id",
//   sourceKey: "offer_product_id",
// });
//--> Product Relationship
Product.belongsTo(User, {
  as: "user",
  foreignKey: "user_id",
  targetKey: "user_id",
});
Product.hasMany(ImageProduct, {
  as: "images",
  foreignKey: "product_id",
  sourceKey: "product_id",
});
Product.belongsTo(Category, {
  // as: "category",
  foreignKey: "category",
  targetKey: "category_id",
});
Product.belongsTo(SubCategory, {
  as: "subcategory",
  foreignKey: "sub_category",
  targetKey: "sub_category_id",
});
//--> SubCategory Relationship
SubCategory.hasMany(Product, {
  as: "products",
  onDelete: "cascade",
  foreignKey: "sub_category",
  sourceKey: "sub_category_id",
});
// //--> User Relationship
User.hasMany(Product, {
  as: "products",
  foreignKey: "user_id",
  sourceKey: "user_id",
});
// SavedProducts.hasOne(Product, {
//   as: "product",
//   foreignKey: "product_id",
//   // targetKey: "product_id",
//   // sourceKey: "user_id",
// });

(async () => {
  // await sequelize.sync({ force: true });
  // await sequelize.sync();
})();
export default sequelize;

//someone that would want to learn, take challenges, fits in to anything...
