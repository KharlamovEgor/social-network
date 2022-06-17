import express, {Express, json, raw} from 'express';
import {inject, injectable} from 'inversify';
import {UsersControllerInterface} from './users/users.controller.interface';
import {Types} from './Types';
import {EnvServiceInterface} from '../base/env.service.interface';
import {LoggerServiceInterface} from '../base/logger.service.interface';
import {ErrorFilterInterface} from '../base/error.filter.interface';
import {DbServiceInterface} from './db.service.interface';
import {ImagesControllerInterface} from './images/images.controller.interface';

@injectable()
export class App {
  private server: Express;
  private port: number;

  constructor(
    @inject(Types.DbService) private readonly dbService: DbServiceInterface,
    @inject(Types.UsersController)
    private usersController: UsersControllerInterface,
    @inject(Types.EnvService) private envService: EnvServiceInterface,
    @inject(Types.LoggerService) private loggerService: LoggerServiceInterface,
    @inject(Types.ErrorFilter) private errorFilter: ErrorFilterInterface,
    @inject(Types.ImagesController)
    private imagesController: ImagesControllerInterface,
  ) {
    this.server = express();
    this.port = Number(this.envService.get('PORT')) || 3000;
  }

  use() {
    this.server.use(json());
    this.server.use(
      raw({
        type: ['image/png', 'image/jpeg'],
        limit: '100mb',
      }),
    );
  }

  useRoutes() {
    this.server.use('/users', this.usersController.router);
    this.server.use('/images', this.imagesController.router);
  }

  useFilters() {
    this.server.use(this.errorFilter.catch.bind(this.errorFilter));
  }

  async init() {
    this.use();
    await this.dbService.connect();
    this.useRoutes();
    this.useFilters();
    this.server.listen(this.port, () =>
      this.loggerService.info(`server working on port ${this.port}`),
    );
  }
}

