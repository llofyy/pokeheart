import { getCustomRepository } from 'typeorm';
import TrainerFragmentRepository from '../../repositories/TrainerFragmentRepository';

interface PokedexProps {
  trainerId: number
}

export default class GetFragmentService {
  public async execute({ trainerId }: PokedexProps) {
    const trainerFragmentRepository = getCustomRepository(TrainerFragmentRepository);

    const existFragment = await trainerFragmentRepository.find({ trainerId });

    if (existFragment) {
      return existFragment;
    }

    return existFragment;
  }
}
