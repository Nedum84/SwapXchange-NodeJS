import randomstring from "randomstring";
import { Product } from "../models";

const generateChars = (
  length = 12,
  charset = "alphanumeric",
  capitalization = "uppercase",
  readable = true
) => {
  return randomstring.generate({ length, readable, charset, capitalization });
};

const generateUniqueCharsForColumn = async (
  model: any,
  column: string,
  length = 12,
  charset = "alphabetic"
) => {//:Promise<Model<TModelAttributes, TCreationAttributes>>
  let exists;
  let string;
  do {
    string = generateChars(length, charset);
    exists = await model.findOne({ where: { [column]: string } });
  } while (exists);

  return string;
};

const generateProductOrderId = async () => {
  return generateUniqueCharsForColumn(Product, "order_id", 10);
};

export default {
  generateUniqueCharsForColumn,
  generateProductOrderId,
};
