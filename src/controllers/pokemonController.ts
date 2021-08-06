import { Request, Response } from "express";

import * as pokemonService from "../services/pokemonService";

export async function getAll(req: Request, res: Response){
    try {
        //console.log(res.locals.user);
        const pokemons = await pokemonService.getAll();

        res.send(pokemons);

    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}