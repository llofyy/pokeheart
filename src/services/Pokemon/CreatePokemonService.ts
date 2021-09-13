import { getCustomRepository } from 'typeorm';
import PokemonRepository from '../../repositories/PokemonRepository';
import TrainerPokemonsRepository from '../../repositories/TrainerPokemonsRepository';
import TrainerRepository from '../../repositories/TrainerRepository';

interface PokemonProps {
  name: string
  imageUrl: string
  attribute: string
  cp: number
}

export default class CreatePokemonService {
  public async execute({
    name, imageUrl, attribute, cp,
  }: PokemonProps, trainerId: number) {
    const pokemonRepository = getCustomRepository(PokemonRepository);
    const trainerPokemonsRepository = getCustomRepository(TrainerPokemonsRepository);
    const trainerRepository = getCustomRepository(TrainerRepository);

    const trainer = await trainerRepository.findOne({ id: trainerId });

    if (trainer.captures === 0) {
      throw new Error('Você não tem capturas disponíveis.');
    }
    const pokemonAlreadyExist = await pokemonRepository.findOne({ name });
    if (!pokemonAlreadyExist) {
      const pokemon = pokemonRepository.create({
        name,
        imageUrl,
        attribute,
      });

      await trainerRepository.update({ id: trainerId }, {
        captures: trainer.captures - 1,
      });

      await pokemonRepository.save(pokemon);

      const trainerPokemon = trainerPokemonsRepository.create({
        trainerId,
        pokemonId: pokemon.id,
        cp,
      });

      await trainerPokemonsRepository.save(trainerPokemon);
      return pokemon;
    }

    const trainerPokemon = trainerPokemonsRepository.create({
      trainerId,
      pokemonId: pokemonAlreadyExist.id,
      cp,
    });

    await trainerRepository.update({ id: trainerId }, {
      captures: trainer.captures - 1,
    });

    await trainerPokemonsRepository.save(trainerPokemon);

    return pokemonAlreadyExist;
  }
}
