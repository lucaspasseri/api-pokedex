import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userController from "./controllers/userController";
import * as dbController from "./controllers/dbController";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", userController.getUsers);
app.post("/sign-up", userController.newUser);
app.post("/sign-in", userController.login);

app.get("/db-populate-with-pokemons", dbController.populate);


export async function init () {
  await connectDatabase();
}

export default app;
