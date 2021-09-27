import faker from "faker";
import { ProductCondition, ProductStatus } from "../../src/enum/product.enum";
import { Product, ProductAttributes } from "../../src/models/product.model";

//@ts-ignore
const fake: ProductAttributes = {
  // id: faker.datatype.number(),
  // product_id: faker.datatype.uuid(),
  order_id: faker.datatype.string(12),
  product_name: faker.datatype.string(25),
  category: faker.datatype.uuid(),
  sub_category: faker.datatype.uuid(),
  price: faker.datatype.number({ max: 1000 }),
  product_description: faker.random.words(),
  product_suggestion: [faker.datatype.string()],
  product_condition: ProductCondition.FAIRLY_USED,
  product_status: ProductStatus.ACTIVE,
  user_id: faker.datatype.uuid(),
  user_address: faker.random.words(),
  user_address_city: faker.random.words(),
  user_address_lat: faker.datatype.number({ min: -10, max: 10 }),
  user_address_long: faker.datatype.number({ min: -10, max: 10 }),
  upload_price: faker.datatype.number(),
};
const fakes = Array.from(Array(10000).keys()).map((i) => {
  const order_id = `${faker.datatype.number({ max: 36000 })}-${i}`;
  return { ...fake, order_id } as ProductAttributes;
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
  fakeProduct: fake,
};
