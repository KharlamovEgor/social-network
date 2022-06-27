import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { AuthGuard } from '../../base/auth.guard';
import { BaseController } from '../../base/base.controller';
import { HttpError } from '../../base/error.filter.interface';
import { LoggerServiceInterface } from '../../base/logger.service.interface';
import { ValidateMiddleware } from '../../base/validate.middleware';
import { Types } from '../Types';
import { MessageCreateDto } from './dto/message.create.dto';
import { MessageDeleteDto } from './dto/message.delete.dto';
import { MessageReadDto } from './dto/message.read.dto';
import { MessageUpdateDto } from './dto/message.uptate.dto';
import { MessagesControllerInterface } from './messages.controller.interface';
import { MessagesService } from './messages.service';

export class MessagesController extends BaseController implements MessagesControllerInterface {
	constructor(
		@inject(Types.LoggerService) readonly loggerService: LoggerServiceInterface,
		@inject(Types.MessagesService) private readonly messagesService: MessagesService,
	) {
		super(loggerService);

		const createValidate = new ValidateMiddleware(MessageCreateDto);
		const readValidate = new ValidateMiddleware(MessageReadDto);
		const deleteValidate = new ValidateMiddleware(MessageDeleteDto);
		const updateValidate = new ValidateMiddleware(MessageUpdateDto);

		const authGuard = new AuthGuard();

		this.bindRoutes([
			{
				path: '/create',
				method: 'post',
				func: this.create,
				middlewares: [createValidate.use.bind(createValidate), authGuard.check.bind(authGuard)],
			},
			{
				path: '/read',
				method: 'post',
				func: this.read,
				middlewares: [readValidate.use.bind(readValidate), authGuard.check.bind(authGuard)],
			},
			{
				path: '/update',
				method: 'post',
				func: this.update,
				middlewares: [updateValidate.use.bind(updateValidate), authGuard.check.bind(authGuard)],
			},
			{
				path: '/delete',
				method: 'post',
				func: this.delete,
				middlewares: [deleteValidate.use.bind(deleteValidate), authGuard.check.bind(authGuard)],
			},
		]);
	}

	async create(
		req: Request<{}, {}, MessageCreateDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const message = await this.messagesService.create({ ...req.body, date: Date.now() });

		if (!message) {
			return next(new HttpError(400, 'There is no such user(s)'));
		}

		res.json(message);
	}
	async read(
		req: Request<{}, {}, MessageReadDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const message = await this.messagesService.read(req.body.from, req.body.to);

		if (!message) {
			return next(new HttpError(400, 'There is no such user(s)'));
		}
		res.json(message);
	}
	async update(
		req: Request<{}, {}, MessageUpdateDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const message = await this.messagesService.update(req.body.id, req.body.text);

		if (!message) {
			return next(new HttpError(400, "message don't exist"));
		}

		res.json(message);
	}
	async delete(
		req: Request<{}, {}, MessageDeleteDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const message = await this.messagesService.delete(req.body.id);

		if (!message) {
			return next(new HttpError(400, "message don't exist"));
		}

		res.json(message);
	}
}
