import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { getRepository } from "typeorm";

import User from "../entities/User";

export async function getUsers () {
  const users = await getRepository(User).find({
    select: ["id", "email"]
  });
  
  return users;
}

export async function createUser(email: string,  password: string): Promise<User>{
  const repository = getRepository(User);
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = repository.create({email, password: hashedPassword});
  let result = null;
  try {
    result = await repository.save(newUser);
  } catch(err) {
    console.log(err.detail);
    return null;
  }
  return result;
}