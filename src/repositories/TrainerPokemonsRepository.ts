import { EntityRepository, Repository } from 'typeorm';
import TrainerPokemons from '../models/TrainerPokemons';

@EntityRepository(TrainerPokemons)
export default class TrainerPokemonsRepository extends Repository<TrainerPokemons> {}
