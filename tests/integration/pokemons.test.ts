import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";

import { clearDatabase } from "../utils/database";
import { createSession, createUser } from "../factories/userFactory";


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

describe("GET /pokemons", () => {
    it("should answer status 401 when no token is passed.", async () => {
        const response = await supertest(app).get("/pokemons");
        expect(response.status).toBe(401);
    });

    it("should answer status 401 when an invalid token is passed.", async () => {

        const header = {Authorization: "Bearer blablabla"};

        const response = await supertest(app).get("/pokemons").set(header);
        expect(response.status).toBe(401);
    });

    it("should answer status 200 when a valid token is passed.", async () => {

        const user = await createUser();

        const token = "blablabla";

        await createSession(user.id, token);

        const header = {Authorization: `Bearer ${token}`};

        const response = await supertest(app).get("/pokemons").set(header);
        expect(response.status).toBe(200);
    });
});
