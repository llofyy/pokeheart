import { getCustomRepository } from 'typeorm';
import TrainerRepository from '../../repositories/TrainerRepository';

export default class TrainerService {
  public async execute() {
    const trainerRepository = getCustomRepository(TrainerRepository);
    const trainers = await trainerRepository.find();
    const trainersNoPassword = trainers.map((tr) => {
      const trainer = tr;
      delete trainer.password;
      return trainer;
    });
    return trainersNoPassword;
  }
}
