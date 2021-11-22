import request from "supertest";
import { app } from "../../src/app";
import { MethodOfSub } from "../../src/enum/coins.enum";

describe("Coins", () => {
  it("should succeed when I add coins", async () => {
    const { tokens } = await global.signin();
    //Load money
    await request(app)
      .post("/api/v1/coins")
      .set("authorization", `bearer ${tokens?.access?.token}`)
      .send({
        // amount: 10,
        // method_of_subscription: MethodOfSub.DAILY_OPENING,
        // reference: "NVKOUP6TIC_1000_31_759",
        payload:
          "HCxxbgt6RB15AWdi2C2rX2zRzGm+2NZqaBLSR7zhhdbg8dbTIpuEzzy46UimtR609nAaP46GZrkR7+tWx1zW6PSO6UDEgmnR+4VNVBMzykCrksE3BHlsMqJvR/PCknPOd76OIyK53ddJAWErElDD7kmgKKR7FXjugAu4eW8eopA=",
      })
      .expect(201);
  });
});
