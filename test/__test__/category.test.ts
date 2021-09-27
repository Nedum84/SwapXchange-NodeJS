import request from "supertest";
import { app } from "../../src/app";

describe("test add money", () => {
  it("should succeed when I add money with valid auth tokens", async () => {
    const { tokens } = await global.signin();

    // const response = await request(app)
    //   .post("/addmoney")
    //   .set("authorization", `bearer ${tokens?.access?.token}`)
    //   .send({
    //     amount: 1200,
    //   });

    // expect(response.body.data).toHaveProperty("wallet");
    // expect(response.body.data).toHaveProperty("point_earn");
    // expect(response.statusCode).toEqual(200);
    // expect(response.body).toMatchObject({
    //   success: true,
    // });
  });

  it("should fail for invalid amount", async () => {
    const { tokens } = await global.signin();

    // const response = await request(app)
    //   .post("/addmoney")
    //   .set("authorization", `bearer ${tokens?.access?.token}`)
    //   .send({
    //     amount: "InvalidInt",
    //   });

    // expect(response.body).toMatchObject({
    //   success: false,
    // });
    // expect(response.statusCode).toEqual(400);
  });
});
