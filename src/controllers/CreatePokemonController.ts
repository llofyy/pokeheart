import type { Request, Response } from 'express';
import api from 'axios';
import CreatePokemonService from '../services/Pokemon/CreatePokemonService';

export default class CreatePokemonController {
  public async handle(req: Request, res: Response) {
    const { pokeName, trainerId, cp } = req.body;
    const returnPokemon = await api.get('https://pokeapi.co/api/v2/pokemon?limit=200').then((response) => {
      const pokemons = response.data.results;
      const exactPokemon = pokemons.filter(
        (pokemon: { name: string; }) => pokemon.name === pokeName,
      );
      return exactPokemon[0];
    });

    await api.get(`${returnPokemon.url}`).then(async (poke) => {
      const createPokemonService = new CreatePokemonService();
      const pk = poke.data;
      const attribute = pk.types.map((tp: { type: { name: string; }; }) => tp.type.name);
      const pokemon = await createPokemonService.execute({
        name: returnPokemon.name,
        imageUrl: pk.sprites.front_default,
        attribute: attribute.join(),
        cp,
      }, trainerId);

      res.json(pokemon);
    });
  }
}
