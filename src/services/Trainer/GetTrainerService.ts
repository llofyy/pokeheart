import { getCustomRepository } from 'typeorm';
import TrainerRepository from '../../repositories/TrainerRepository';

export default class GetTrainerService {
  public async execute(id: number) {
    const trainerRepository = getCustomRepository(TrainerRepository);

    const trainer = await trainerRepository.findOne({ id });

    if (!trainer) {
      throw new Error('Usuário não existe');
    }

    delete trainer.password;

    return trainer;
  }
}
