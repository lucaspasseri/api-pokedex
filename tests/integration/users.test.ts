import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createUser, createUserWithParams } from "../factories/userFactory";
import { clearDatabase } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe("GET /users", () => {
  it("should answer with text \"OK!\" and status 200", async () => {
    const user = await createUser();

    const response = await supertest(app).get("/users");
    
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: user.email
        })
      ])
    );

    expect(response.status).toBe(200);
  });
});

describe("POST /sign-up", () => {
  it("should answer with 400 when an invalid email is passed.", async () => {

    const body = {email:"123123", password:"123123", confirmPassword: "123123"};

    const response = await supertest(app).post("/sign-up").send(body);

    expect(response.status).toBe(400);
  });

  it("should answer with 400 when a password and its confirmation are different.", async () => {

    const body = {email:"lucas@gmail.com", password:"123123", confirmPassword: "123456"};

    const response = await supertest(app).post("/sign-up").send(body);

    expect(response.status).toBe(400);
  });

  it("should answer with 409 when an email is already registered.", async () => {

    const user = await createUserWithParams("lucas@gmail.com", "123123");

    const body = {email:"lucas@gmail.com", password:"123123", confirmPassword: "123123"};

    const response = await supertest(app).post("/sign-up").send(body);

    expect(response.status).toBe(409);
  });

  it("should answer with 201 when everything is correct.", async () => {

    const body = {email:"lucas@gmail.com", password:"123123", confirmPassword: "123123"};

    const response = await supertest(app).post("/sign-up").send(body);

    expect(response.status).toBe(201);
  });

});
