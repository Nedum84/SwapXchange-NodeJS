import request from "supertest";
import { app } from "../../src/app";

describe("Category test", () => {
  it("should succeed when create category", async () => {
    const { tokens } = await global.signin();

    const response = await request(app)
      .post("/api/v1/category")
      .set("authorization", `bearer ${tokens?.access?.token}`)
      .send({
        category_name: "Shoess",
        category_icon:
          "https://www.seekpng.com/png/detail/186-1864322_overwatch-icon-button-overwatch-logo.png",
      });

    expect(response.body).toHaveProperty("data");
    expect(response.statusCode).toEqual(201);
    expect(response.body).toMatchObject({
      success: true,
    });
  });

  it("Can get all categories", async () => {
    const { tokens } = await global.signin();

    const response = await request(app)
      .get("/api/v1/category")
      .set("authorization", `bearer ${tokens?.access?.token}`)
      .send();

    expect(response.body).toMatchObject({
      success: true,
    });
    expect(response.statusCode).toEqual(200);
  });
});
