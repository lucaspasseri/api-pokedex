import { getRepository } from "typeorm";
import faker from "faker";

import User from "../../src/entities/User";

export async function createUser () {
  const user = getRepository(User).create({
    email: faker.internet.email(),
    password: faker.internet.password(6)
  });

  await getRepository(User).save(user);

  return user;
}

export async function createUserWithParams (email: string, password: string): Promise<User>{
  const user = getRepository(User).create({
    email: email,
    password: password
  });

  await getRepository(User).save(user);

  return user;
}
