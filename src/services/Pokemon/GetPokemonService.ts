import { getCustomRepository } from 'typeorm';
import PokemonRepository from '../../repositories/PokemonRepository';

export default class GetPokemonService {
  public async execute(id:number) {
    const pokemonRepostirory = getCustomRepository(PokemonRepository);
    const pokemon = await pokemonRepostirory.findOne({ id });
    if (!pokemon) {
      throw new Error('Pokemon não existe');
    }
    return pokemon;
  }
}
