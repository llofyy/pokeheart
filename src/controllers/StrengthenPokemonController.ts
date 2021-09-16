import type { Request, Response } from 'express';
import DeletePokemonService from '../services/Pokemon/DeletePokemonService';
import RemoveFragmentService from '../services/Fragment/RemoveFragmentService';
import StrengthenPokemonService from '../services/Pokemon/StrengthenPokemonService';

export default class StrengthenPokemonController {
  public async handle(req: Request, res: Response) {
    const {
      trainer, fragment, pokemonId, cp,
      pokemonCp,
    } = req.body;

    const deletePokemonService = new DeletePokemonService();
    const removeFragmentService = new RemoveFragmentService();
    const strengthenPokemonService = new StrengthenPokemonService();

    await removeFragmentService.execute(trainer.id, fragment);
    await deletePokemonService.execute({ trainerId: trainer.id, pokemonId, cp });
    const pokemon = await strengthenPokemonService.execute(trainer.id, pokemonId, cp, pokemonCp);

    res.json(pokemon);
  }
}
