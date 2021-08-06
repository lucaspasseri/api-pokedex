import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userController from "./controllers/userController";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", userController.getUsers);
//app.get("/populate-with-pokemons", bdController.populate);
app.post("/sign-up", userController.newUser);
app.post("/sign-in", userController.login);


export async function init () {
  await connectDatabase();
}

export default app;
