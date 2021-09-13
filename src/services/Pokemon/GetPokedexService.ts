import { getCustomRepository } from 'typeorm';
import TrainerPokemonsRepository from '../../repositories/TrainerPokemonsRepository';

export default class GetPokedexService {
  public async execute(trainerId: number) {
    const trainerPokemonsRepository = getCustomRepository(TrainerPokemonsRepository);

    const pokedex = await trainerPokemonsRepository.find({ trainerId });
    if (!pokedex) {
      throw new Error('Você não tem nenhum pokemon');
    }
    const pokemonId = pokedex.map((pk) => pk.pokemonId);
    const cp = pokedex.map((pk) => pk.cp);
    return {
      id: pokemonId,
      cp,
    };
  }
}
