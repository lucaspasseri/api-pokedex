import { Request, Response } from "express";
import { signInSchema } from "../schemas/signInSchema";

import * as userService from "../services/userService";

export async function getUsers (req: Request, res: Response) {
  try {
    const users = await userService.getUsers();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

interface Body {
  email: string,
  password: string,
  confirmPassword: string
}

export async function newUser(req: Request, res: Response){
  try {
    const validationsErrors = signInSchema.validate(req.body).error;

    if(validationsErrors) return res.sendStatus(400);

    const { email, password, confirmPassword }: Body = req.body;

    const result = await userService.createUser(email, password);

    if(!result) return res.sendStatus(409);

    res.sendStatus(201);

  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
}