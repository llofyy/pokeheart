import type { Request, Response } from 'express';
import DeletePokemonService from '../services/Pokemon/DeletePokemonService';
import RemoveFragmentService from '../services/Fragment/RemoveFragmentService';
import StrengthenPokemonService from '../services/Pokemon/StrengthenPokemonService';

export default class StrengthenPokemonController {
  public async handle(req: Request, res: Response) {
    const {
      trainerId, fragment, pokemonId, cp,
      pokemonCp,
    } = req.body;

    const deletePokemonService = new DeletePokemonService();
    const removeFragmentService = new RemoveFragmentService();
    const strengthenPokemonService = new StrengthenPokemonService();

    await removeFragmentService.execute(trainerId, fragment);
    await deletePokemonService.execute({ trainerId, pokemonId, cp });
    await strengthenPokemonService.execute(trainerId, pokemonId, cp, pokemonCp);

    res.json({
      message: 'sucesso',
    });
  }
}
