import type { Request, Response } from 'express';
import { hash } from 'bcrypt';
import CreateTrainerService from '../services/Trainer/CreateTrainerService';

export default class CreateTrainerController {
  public async handle(req: Request, res: Response) {
    const {
      name, username, genre, password, region, age,
    } = req.body;
    const createTrainerService = new CreateTrainerService();

    const hashedPassword = await hash(password, 8);
    const trainer = await createTrainerService.execute({
      name, username, genre, password: hashedPassword, region, age,
    });

    res.json(trainer);
  }
}
