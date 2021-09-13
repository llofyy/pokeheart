import { EntityRepository, Repository } from 'typeorm';
import Pokemon from '../models/Pokemon';

@EntityRepository(Pokemon)
export default class PokemonRepository extends Repository<Pokemon> {}
