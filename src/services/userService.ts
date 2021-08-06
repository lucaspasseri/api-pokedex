import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { getRepository } from "typeorm";

import User from "../entities/User";
import Session from "../entities/Session";

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

export async function login(email: string, password: string): Promise<string>{
  const userRepository =  getRepository(User);
  const sessionRepository = getRepository(Session);

  const user = await userRepository.findOne({ email });

  if(!user) return null;

  if(!bcrypt.compareSync(password, user.password)) return null;

  const token = uuid();

  await sessionRepository.insert({userId: user.id, token});

  return token;
}