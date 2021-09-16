import type { Request, Response } from 'express';
import GetPokedexService from '../services/Pokemon/GetPokedexService';
import GetPokemonService from '../services/Pokemon/GetPokemonService';
import GetTrainerService from '../services/Trainer/GetTrainerService';

export default class ProfileController {
  public async handle(req: Request, res: Response) {
    const { trainer } = req.body;
    const getTrainerService = new GetTrainerService();
    const getPokedexService = new GetPokedexService();
    const getPokemonService = new GetPokemonService();
    const trainerData = await getTrainerService.execute(trainer.id);
    await getPokedexService.execute(trainerData.id)
      .then(async (pk) => {
        const pouk = [];
        if (pk.id.length < 1) {
          res.json({
            trainer: trainerData,
            pokedex: pouk,
          });
        } else {
          pk.id.forEach(async (k, index) => {
            const pokemon = await getPokemonService.execute(k);
            const poke = {
              ...pokemon,
              cp: pk.cp[index],
            };
            pouk.push(poke);
            if (pouk.length === pk.id.length) {
              res.json({
                trainer: trainerData,
                pokedex: pouk,
              });
            }
          });
        }
      });
  }
}
