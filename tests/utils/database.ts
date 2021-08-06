import { getRepository } from "typeorm";

import User from "../../src/entities/User";

export async function clearDatabase () {
  const repository = getRepository(User);
  await repository.query(
    `TRUNCATE users RESTART IDENTITY CASCADE`
  );
}
