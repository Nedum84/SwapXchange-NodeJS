import randomstring from "randomstring";
import { Product } from "../models";

// alphanumeric - [0-9 a-z A-Z]
// alphabetic - [a-z A-Z]
// numeric - [0-9]
// hex - [0-9 a-f]
// binary - [01]
// octal - [0-7]
// custom - any given characters

const generateChars = (
  length = 12,
  charset = "alphanumeric",
  capitalization?: string,
  readable = true
) => {
  return randomstring.generate({ length, readable, charset, capitalization });
};

const generateUniqueCharsForColumn = async (
  model: any,
  column: string,
  length = 12,
  charset = "alphanumeric"
) => {
  //:Promise<Model<TModelAttributes, TCreationAttributes>>
  let exists;
  let string;
  do {
    string = generateChars(length, charset);
    exists = await model.findOne({ where: { [column]: string } });
  } while (exists);

  return string;
};

const generateProductOrderId = async () => {
  return generateUniqueCharsForColumn(Product, "order_id", 11, "uppercase");
};

export default {
  generateUniqueCharsForColumn,
  generateProductOrderId,
};
