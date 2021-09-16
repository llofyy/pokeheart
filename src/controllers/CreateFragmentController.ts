import type { Response, Request } from 'express';
import api from 'axios';
import CreateFragmentService from '../services/Fragment/CreateFragmentService';
import DeletePokemonService from '../services/Pokemon/DeletePokemonService';

export default class CreateFragmentController {
  public async handle(req: Request, res: Response) {
    const {
      trainerId, fragment, pokemon, cp, pokemonId,
    } = req.body;
    const createFragmentService = new CreateFragmentService();
    const deletePokemonService = new DeletePokemonService();

    await api.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then(async (response) => {
        const existType = response.data.types.filter((tp) => tp.type.name === fragment);
        if (existType.length > 0) {
          await createFragmentService.execute(trainerId, fragment);
          await deletePokemonService.execute({ trainerId, pokemonId, cp });
          res.json({
            success: 'fragment adicionado com sucesso!',
          });
        } else {
          throw new Error('Erro ao adicionar fragmento');
        }
      });
  }
}
