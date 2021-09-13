import type { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export default function authorizationRequired(req: Request, res: Response, next: NextFunction) {
  const { trainer } = req.cookies;
  verify(trainer, '141312cf5955bd25646e2cca8fc43bb4', (err, decoded) => {
    if (err) {
      res.status(401).redirect('/');
    } else {
      req.body.trainer = decoded;
      next();
    }
  });
}
