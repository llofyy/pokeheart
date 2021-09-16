import { getCustomRepository } from 'typeorm';
import TrainerPokemonsRepository from '../../repositories/TrainerPokemonsRepository';

export default class StrengthenPokemonService {
  public async execute(trainerId: number, pokemonId: number, cp: number, pokemonCp: number) {
    const trainerPokemonsRepository = getCustomRepository(TrainerPokemonsRepository);

    const pokemon = await trainerPokemonsRepository.findOne({
      trainerId,
      pokemonId,
      cp: pokemonCp,
    });
    if (!pokemon) {
      throw new Error('Pokemon não existe na sua lisa');
    }

    await trainerPokemonsRepository.update({
      trainerId,
      pokemonId,
      cp: pokemonCp,
    }, {
      cp: pokemon.cp + cp,
    });
  }
}
