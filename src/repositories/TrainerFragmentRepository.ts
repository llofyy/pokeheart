import { EntityRepository, Repository } from 'typeorm';
import TrainerFragments from '../models/TrainerFragments';

@EntityRepository(TrainerFragments)
export default class TrainerFragmentsRepository extends Repository<TrainerFragments> {}
