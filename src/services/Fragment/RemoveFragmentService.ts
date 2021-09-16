import { getCustomRepository } from 'typeorm';
import TrainerFragmentRepository from '../../repositories/TrainerFragmentRepository';

export default class RemoveFragmentService {
  public async execute(trainerId: number, fragment: string) {
    const trainerFragmentRepository = getCustomRepository(TrainerFragmentRepository);
    const fragmentContains = await trainerFragmentRepository.find({ trainerId, fragment });
    const fragmentContainsExist = fragmentContains.find((fr) => fr.fragment === fragment);

    if (!fragmentContainsExist) {
      throw new Error('Você não contém esse fragmento');
    }

    const trainerFragment = await trainerFragmentRepository.findOne({ trainerId, fragment });

    await trainerFragmentRepository.update({ trainerId, fragment }, {
      counter: trainerFragment.counter - 1,
    });

    if (trainerFragment.counter === 1) {
      await trainerFragmentRepository.delete({ trainerId, fragment });
    }
  }
}
