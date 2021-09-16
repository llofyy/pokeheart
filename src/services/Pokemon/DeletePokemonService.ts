import { getCustomRepository } from 'typeorm';
import TrainerPokemonsRepository from '../../repositories/TrainerPokemonsRepository';

interface PokedexProps {
  trainerId: number
  pokemonId: number
  cp: number
}

export default class DeletePokemonService {
  public async execute({ trainerId, pokemonId, cp }: PokedexProps) {
    const trainerPokemonsRepository = getCustomRepository(TrainerPokemonsRepository);
    const pokemonExist = trainerPokemonsRepository.findOne({ trainerId, pokemonId, cp });

    if (pokemonExist) {
      await trainerPokemonsRepository.delete({ trainerId, pokemonId, cp });
    } else {
      throw new Error('Pokemon não existe');
    }
  }
}
