import type { Request, Response } from 'express';
import GetFragmentService from '../services/Fragment/GetFragmentsService';
import GetPokedexService from '../services/Pokemon/GetPokedexService';
import GetPokemonService from '../services/Pokemon/GetPokemonService';
import GetTrainerService from '../services/Trainer/GetTrainerService';

export default class LaboratoryController {
  public async handle(req: Request, res: Response) {
    const { trainer } = req.body;
    const { pokemonName } = req.params;
    const { success } = req.query;
    const getTrainerService = new GetTrainerService();
    const getPokedexService = new GetPokedexService();
    const getPokemonService = new GetPokemonService();
    const getFragmentService = new GetFragmentService();

    const trainerData = await getTrainerService.execute(trainer.id);
    const fragments = await getFragmentService.execute({ trainerId: trainer.id });

    await getPokedexService.execute(trainerData.id)
      .then(async (pk) => {
        const pouk = [];
        pk.id.forEach(async (k, index) => {
          const pokemon = await getPokemonService.execute(k);
          const poke = {
            ...pokemon,
            cp: pk.cp[index],
          };
          pouk.push(poke);
          const existInPokedex = pouk.filter((p) => p.name === pokemonName);
          if (!existInPokedex) {
            res.redirect('/profile');
          } else if (pouk.length === pk.id.length) {
            res.render('laboratory', {
              trainer: trainerData,
              pokedex: existInPokedex,
              fragments,
              success: !!success,
            });
          }
        });
      });
  }
}
