import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import faker from "faker";

import User from "../../src/entities/User";

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
