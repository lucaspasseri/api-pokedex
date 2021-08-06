import { Request, Response } from "express";

import * as pokemonService from "../services/pokemonService";

export async function getAll(req: Request, res: Response){
    try {
        const pokemons = await pokemonService.getAll();

        res.send(pokemons);

    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function addToMyPokemons(req: Request, res: Response){
    try {
        const { id } = req.params;
        const pokemonId = Number(id);
        await pokemonService.addOne(pokemonId);

        res.sendStatus(200);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}
export async function removeFromMyPokemons(req: Request, res: Response){
    try {
        const { id } = req.params;
        const pokemonId = Number(id);
        await pokemonService.removeOne(pokemonId);

        res.sendStatus(200);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}