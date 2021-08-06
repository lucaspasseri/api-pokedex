import { getRepository } from "typeorm";

import Pokemon from "../entities/Pokemon";

export async function getAll(): Promise<Pokemon[]>{
    const repository = getRepository(Pokemon);
    const pokemons = await repository.find();

    return pokemons;
}