import request from "supertest";
import * as faker from "faker";
import { app } from "../../src/app";

describe("test for balance enquiry", () => {
  it("should succeed when I add money and get my balance", async () => {
    const { tokens, user } = await global.signin();

    // //Load money
    // await request(app)
    //   .post("/addmoney")
    //   .set("authorization", `bearer ${tokens?.access?.token}`)
    //   .send({
    //     amount,
    //   })
    //   .expect(200);
    // //get balance
    // const res = await request(app)
    //   .get("/balance")
    //   .set("authorization", `bearer ${tokens?.access?.token}`);

    // expect(res.body.data).toHaveProperty("balance");
    // expect(res.body.data).toHaveProperty("point_earn");
    // expect(res.body.data.balance).toEqual(amount);
  });
});
