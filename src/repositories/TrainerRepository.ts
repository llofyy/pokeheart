import { EntityRepository, Repository } from 'typeorm';
import Trainer from '../models/Trainer';

@EntityRepository(Trainer)
export default class TrainerRepository extends Repository<Trainer> {}
