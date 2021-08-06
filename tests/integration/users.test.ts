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
  await clearDatabase();
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

    await createUserWithParams("lucas@gmail.com", "123123");

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

describe("POST /sign-in", () => {
  it("should answer with 400 when an invalid email is passed.", async () => {

    const body = {email:"123123", password:"123123"};

    const response = await supertest(app).post("/sign-in").send(body);

    expect(response.status).toBe(400);
  });

  it("should answer with 401 when an email is not registred.", async () => {

    const body = {email:"lucas@gmail.com", password:"123123"};

    const response = await supertest(app).post("/sign-in").send(body);

    expect(response.status).toBe(401);
  });

  it(`should answer with 401 when an email is registred but
    the password does not match.`, async () => {

    await createUserWithParams("lucas@gmail.com", "123123");

    const body = {email:"lucas@gmail.com", password:"123456"};

    const response = await supertest(app).post("/sign-in").send(body);

    expect(response.status).toBe(401);
  });

  it(`should answer with a token and status 200 when everything
    is correct.`, async () => {

    await createUserWithParams("lucas@gmail.com", "123123");

    const body = {email:"lucas@gmail.com", password:"123123"};

    const response = await supertest(app).post("/sign-in").send(body);   

    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String)
      })
    );

    expect(response.status).toBe(200);
  });
});
