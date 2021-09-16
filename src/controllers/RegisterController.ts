import type { Request, Response } from 'express';

export default class RegisterController {
  public async handle(req: Request, res: Response) {
    res.render('register');
  }
}
