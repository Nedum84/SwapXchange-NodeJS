import request from "supertest";
import { app } from "../../src/app";
import customFake from "../factories/custom.fake";

beforeAll(async () => {});
describe("Auth test", () => {
  it("returns a 201 on successful signup", async () => {
    const res = await request(app).post("/v1/auth").send({
      uid: customFake.fakeUuid,
      name: customFake.fakeName,
      mobile_number: customFake.fakePhone,
      email: customFake.fakeEmail,
    });

    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("user");
    expect(res.body.data).toHaveProperty("tokens");
    expect(res.statusCode).toEqual(201);
  });

  it("should fail when signup with invalid/incomplete details", async () => {
    const response = await request(app)
      .post("/v1/auth")
      .send({
        uid: customFake.fakeUuid,
        name: customFake.fakeName,
        mobile_number: customFake.fakePhone,
        email: "wrong email dot com",
      })
      .expect(400);
    expect(response.body).toMatchObject({
      success: false,
    });
  });
  it("returns a 200 on successful refresh token", async () => {
    const res = await request(app).post("/v1/auth").send({
      uid: customFake.fakeUuid,
      name: customFake.fakeName,
      mobile_number: customFake.fakePhone,
      email: customFake.fakeEmail,
    });
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("user");
    expect(res.body.data).toHaveProperty("tokens");
    expect(res.statusCode).toEqual(201);

    const { tokens } = res.body.data;

    return request(app)
      .post("/v1/auth/refreshtoken")
      .send({
        refresh_token: tokens?.refresh?.token,
      })
      .expect(200);
  });
});
