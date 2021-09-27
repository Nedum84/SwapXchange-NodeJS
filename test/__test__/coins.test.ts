import request from "supertest";
import { app } from "../../src/app";
import { MethodOfSub } from "../../src/enum/coins.enum";

describe("Coins", () => {
  it("should succeed when I add coins", async () => {
    const { tokens } = await global.signin();
    //Load money
    await request(app)
      .post("/v1/coins")
      .set("authorization", `bearer ${tokens?.access?.token}`)
      .send({
        amount: 10,
        method_of_subscription: MethodOfSub.DAILY_OPENING,
        reference: "NVKOUP6TIC_1000_31_759",
      })
      .expect(201);
  });
});
