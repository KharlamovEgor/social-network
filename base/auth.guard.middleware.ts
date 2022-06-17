import {NextFunction, Request, Response} from 'express';

export interface AuthGuardInterface {
  check: (req: Request, res: Response, next: NextFunction) => void;
}
