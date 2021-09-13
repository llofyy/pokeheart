import type { Request, Response } from 'express';
import ListTrainerService from '../services/Trainer/ListTrainersService';

export default class TrainerController {
  public async handle(req: Request, res: Response) {
    const listTrainerService = new ListTrainerService();
    const trainersList = await listTrainerService.execute();
    res.json(trainersList);
  }
}
