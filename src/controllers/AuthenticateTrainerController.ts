import type { Request, Response } from 'express';
import AuthenticateTrainerService from '../services/Trainer/AuthenticateTrainerService';

export default class AuthenticateTrainerController {
  public async handle(req: Request, res: Response) {
    const { username, password } = req.body;
    const authenticateTrainerService = new AuthenticateTrainerService();
    await authenticateTrainerService.execute({ username, password }).then((auth) => {
      res.cookie('trainer', auth, { path: '/' });
      res.json(auth);
    });
  }
}
