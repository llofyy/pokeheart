import { getCustomRepository } from 'typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import TrainerRepository from '../../repositories/TrainerRepository';

interface AuthenticateProps {
  username: string
  password: string
}

export default class AuthenticateTrainerService {
  public async execute({ username, password }: AuthenticateProps) {
    const trainerRepository = getCustomRepository(TrainerRepository);

    const trainer = await trainerRepository.findOne({ username });

    if (!trainer) {
      throw new Error('Usuário e/ou senha incorretos.');
    }

    const comparePassword = await compare(password, trainer.password);

    if (!comparePassword) {
      throw new Error('Usuário e/ou senha incorretos.');
    }

    const token = sign(
      {
        id: trainer.id,
      },
      '141312cf5955bd25646e2cca8fc43bb4',
      {
        subject: `${trainer.id}`,
        expiresIn: '1d',
      },
    );

    return token;
  }
}
