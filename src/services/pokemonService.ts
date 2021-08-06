import { getRepository } from "typeorm";

import Pokemon from "../entities/Pokemon";

export async function getAll(): Promise<Pokemon[]>{
    const repository = getRepository(Pokemon);
    const pokemons = await repository.find();

    return pokemons;
}

export async function addOne(pokemonId: number){
    const repository = getRepository(Pokemon);
    const pokemon = await repository.update({id: pokemonId}, {inMyPokemons: true});
}

export async function removeOne(pokemonId: number){
    const repository = getRepository(Pokemon);
    const pokemon = await repository.update({id: pokemonId}, {inMyPokemons: false});
}