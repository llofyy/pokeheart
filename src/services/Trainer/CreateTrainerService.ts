import { getCustomRepository } from 'typeorm';
import TrainerRepository from '../../repositories/TrainerRepository';

interface TrainerProps {
  name: string
  username: string
  password: string
  genre: string
  region: string
  age: number,
}

export default class CreateTrainerService {
  public async execute({
    name, username, genre, password, region, age,
  }: TrainerProps) {
    if (genre !== 'male' && genre !== 'female') {
      throw new Error('Gênero inválido');
    }

    if (region !== 'Kanto' && region !== 'Johto' && region !== 'Hoenn' && region !== 'Sinnoh') {
      throw new Error('Região inválida');
    }

    const trainerRepository = getCustomRepository(TrainerRepository);

    const userAlreadyExist = await trainerRepository.findOne({ username });

    if (userAlreadyExist) {
      throw new Error('Usuário já existe');
    }

    const trainer = trainerRepository.create({
      name,
      username,
      genre,
      password,
      region,
      age,
      captures: 5,
    });

    await trainerRepository.save(trainer);

    delete trainer.password;

    return trainer;
  }
}
