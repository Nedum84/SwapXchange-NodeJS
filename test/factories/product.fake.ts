import faker from "faker";
import { ProductCondition, ProductStatus } from "../../src/enum/product.enum";
import { Product, ProductAttributes } from "../../src/models/product.model";

const fake: ProductAttributes = {
  id: faker.datatype.number(),
  product_id: faker.datatype.uuid(),
  order_id: faker.datatype.string(12),
  product_name: faker.datatype.string(25),
  category: faker.datatype.uuid(),
  sub_category: faker.datatype.uuid(),
  price: faker.datatype.number({ max: 1000 }),
  product_description: faker.random.words(),
  product_suggestion: [faker.datatype.string()],
  product_condition: ProductCondition.FAIRLY_USED,
  product_status: ProductStatus.ACTIVE,
  user_id: faker.random.words(),
  user_address: faker.random.words(),
  user_address_city: faker.random.words(),
  user_address_lat: faker.datatype.number(),
  user_address_long: faker.datatype.number(),
  upload_price: faker.datatype.number(),
};
const fakes = Array.from(Array(10).keys()).map((i) => {
  return fake as ProductAttributes;
});

const createBulk = async () => {
  await Product.bulkCreate(fakes);
};
const createOne = async () => {
  await Product.create(fake);
};

export default {
  createBulk,
  createOne,
};
