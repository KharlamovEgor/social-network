import { NextFunction, Request, Response, Router } from 'express';
import { AuthLoginDto } from './dto/auth.login.dto';

export interface AuthControllerInterface {
	router: Router;
	login: (req: Request<AuthLoginDto>, res: Response, next: NextFunction) => Promise<void>;
}
