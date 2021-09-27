import request from "supertest";
import { app } from "../../src/app";

describe("test the JWT authorization middleware", () => {
  it("should succeed when accessing an authed route with a valid JWT", async () => {
    const { tokens } = await global.signin();

    const response = await request(app)
      .get("/v1/users/me")
      .expect(200)
      .set("authorization", `bearer ${tokens?.access?.token}`);

    expect(response.body).toMatchObject({
      success: true,
    });
  });

  it("should fail when accessing an authed route with an invalid JWT", async () => {
    const invalidJwt = "OhMyToken";

    const response = await request(app)
      .get("/v1/users/me")
      .expect(401)
      .set("authorization", `bearer ${invalidJwt}`);

    expect(response.body).toMatchObject({
      success: false,
    });
  });

  it("Should return 200 on user profile update", async () => {
    const { tokens } = await global.signin();

    return request(app)
      .patch("/v1/users/me")
      .set("authorization", `bearer ${tokens?.access?.token}`)
      .send({
        mobile_number: "08066761212",
      })
      .expect(200);
  });

  it("Should return 400 on invalid profile update parameter", async () => {
    const { tokens } = await global.signin();

    return request(app)
      .patch("/v1/users/me")
      .set("authorization", `bearer ${tokens?.access?.token}`)
      .send({
        phone_number: "0809817216",
      })
      .expect(400);
  });
});
