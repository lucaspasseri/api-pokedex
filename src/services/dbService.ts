import axios from "axios";
import { getRepository } from "typeorm";

import Pokemon from "../entities/Pokemon";

export async function populate(quantity:number){
    const repository = getRepository(Pokemon);

    for(let i = 1; i < quantity+1; i++){
        const request = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);

        const reducer = (acc:string, curr:any) => `${acc} ${curr.type.name}`; 
        const types = request.data.types.reduce(reducer,"");

        const name = request.data.name;
        const number = request.data.order;
        const image = request.data.sprites.front_default;
        const weight = request.data.weight;
        const height = request.data.height;
        const baseExp = request.data.base_experience;
        const description = types;
        const inMyPokemons = false;

        await repository.insert({
            name,
            number, 
            image, 
            weight, 
            height, 
            baseExp, 
            description, 
            inMyPokemons
        });
    }
       
}