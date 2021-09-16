import type { Request, Response } from 'express';
import api from 'axios';
import GetTrainerService from '../services/Trainer/GetTrainerService';

export default class ExploreController {
  public async handle(req: Request, res: Response) {
    const { trainer } = req.body;
    const pokeIndex = Math.floor(Math.random() * 200);
    const pokemons = await api.get('https://pokeapi.co/api/v2/pokemon?limit=200').then((response) => response.data.results);
    const chanceToCapture = pokemons.splice(pokeIndex, 6);
    const pokeList = [];
    chanceToCapture.forEach(async (pokemon: { name: string; }) => {
      await api.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(async (poke) => {
        const thisPoke = {
          name: poke.data.name,
          image: poke.data.sprites.front_default,
          attributes: poke.data.types.map(
            (attr: { type: { name: Array<string>; }; }) => attr.type.name,
          ),
        };
        pokeList.push(thisPoke);
        if (pokeList.length === chanceToCapture.length) {
          const getTrainerService = new GetTrainerService();
          const trainerData = await getTrainerService.execute(trainer.id);
          res.json({
            trainer: trainerData,
            pokemons: pokeList,
          });
        }
      });
    });
  }
}
