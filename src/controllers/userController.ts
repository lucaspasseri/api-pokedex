import { Request, Response } from "express";
import { signUpSchema } from "../schemas/signUpSchema";
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

interface SignUpBody {
  email: string,
  password: string,
  confirmPassword: string
}

export async function newUser(req: Request, res: Response){
  try {
    const validationsErrors = signUpSchema.validate(req.body).error;

    if(validationsErrors) return res.sendStatus(400);

    const { email, password, confirmPassword }: SignUpBody = req.body;

    const result = await userService.createUser(email, password);

    if(!result) return res.sendStatus(409);

    res.sendStatus(201);

  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
}

interface SignInBody {
  email: string,
  password: string
}

export async function login(req: Request, res: Response){
  try {
    const validationsErrors = signInSchema.validate(req.body).error;
    
    if(validationsErrors) return res.sendStatus(400);

    const {email, password}: SignInBody = req.body;

    const token = await userService.login(email, password);

    if(!token) return res.sendStatus(401);

    res.send({token});

  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
}