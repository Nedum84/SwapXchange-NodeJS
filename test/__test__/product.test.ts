import request from "supertest";
import * as faker from "faker";
import { app } from "../../src/app";
import productFake from "../factories/product.fake";

describe("Product", () => {
  it("Can add product", async () => {
    const { tokens, user } = await global.signin();

    const { user_id, order_id, ...others } = productFake.fakeProduct;
    const response = await request(app)
      .post("/api/v1/products")
      .set("authorization", `bearer ${tokens?.access?.token}`)
      .send({
        ...others,
        images: [
          {
            image_path: "https/asbahjsbhjas.com",
          },
        ],
      });

    expect(response.body.data).toHaveProperty("product");
    expect(response.body.data.product).toHaveProperty("product_name");
    expect(response.body.data.product).toHaveProperty("user");
    expect(response.statusCode).toEqual(201);
    expect(response.body).toMatchObject({
      success: true,
    });
  });
  it("Can get products", async () => {
    const { tokens, user } = await global.signin();

    const { user_id, order_id, ...others } = productFake.fakeProduct;

    await request(app)
      .post("/api/v1/products")
      .set("authorization", `bearer ${tokens?.access?.token}`)
      .send({
        ...others,
        // order_id: faker.datatype.number({ max: 36000 }).toString(),
        user_address_lat: user.address_lat,
        user_address_long: user.address_long,
        images: [
          {
            image_path: "https/asbahjsbhjas.com",
          },
        ],
      })
      .expect(201);
    //--> bulk create
    await productFake.createBulk();

    const response = await request(app)
      .get("/api/v1/products?offset=0&limit=60")
      .set("authorization", `bearer ${tokens?.access?.token}`)
      .send();

    expect(response.body.data).toHaveProperty("products");
    expect(response.body.data.products.length).toBeGreaterThan(0);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toMatchObject({
      success: true,
    });
  });
});
