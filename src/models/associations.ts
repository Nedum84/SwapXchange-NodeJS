"use strict";
import sequelize from ".";
import { AppSettings } from "./app.settings.model";
import { categoryAssociate } from "./category.model";
import { coinsAssociate } from "./coins.model";
import { imageProductAssociate } from "./image.product.model";
import { productChatsAssociate } from "./product.chats.model";
import { productAssociate } from "./product.model";
import { subcategoryAssociate } from "./subcategory.model";
import { userAssociate } from "./user.model";

export const runAssociations = async () => {
  // await sequelize.sync({ force: true });
  // await sequelize.sync({ alter: true });
  // AppSettings.sync({ force: true });
  productChatsAssociate();
  imageProductAssociate();
  coinsAssociate();
  productAssociate();
  userAssociate();
  categoryAssociate();
  subcategoryAssociate();
};
