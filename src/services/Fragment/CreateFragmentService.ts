import { getCustomRepository } from 'typeorm';
import TrainerFragmentsRepository from '../../repositories/TrainerFragmentRepository';

export default class CreateFragmentService {
  public async execute(trainerId: number, fragment: string) {
    const trainerFragmentRepository = getCustomRepository(TrainerFragmentsRepository);

    const fragmentAlreadyExist = await trainerFragmentRepository.findOne({ trainerId, fragment });

    if (fragmentAlreadyExist) {
      await trainerFragmentRepository.update({ trainerId, fragment }, {
        counter: fragmentAlreadyExist.counter + 1,
      });

      return fragmentAlreadyExist;
    }

    const newFragment = trainerFragmentRepository.create({
      trainerId,
      fragment,
      counter: 1,
    });

    await trainerFragmentRepository.save(newFragment);

    return newFragment;
  }
}
