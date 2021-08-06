import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import faker from "faker";
import {v4 as uuid} from "uuid";

import User from "../../src/entities/User";
import Session from "../../src/entities/Session";

export async function createUser (): Promise<User> {

  const hashedPassword = bcrypt.hashSync(faker.internet.password(6), 10);

  const user = getRepository(User).create({
    email: faker.internet.email(),
    password: hashedPassword
  });

  await getRepository(User).save(user);

  return user;
}

export async function createUserWithParams (email: string, password: string): Promise<User>{
  
  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = getRepository(User).create({
    email: email,
    password: hashedPassword
  });

  await getRepository(User).save(user);

  return user;
}

export async function createSession (userId: number, token: string){
  const repository = getRepository(Session);
  await repository.insert({userId, token});
}