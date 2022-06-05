import "reflect-metadata";
import { Container, ContainerModule } from "inversify";
import { App } from "./App";
import { Types } from "./Types";
import { UsersController } from "./users/users.controller";
import { UsersControllerInterface } from "./users/users.controller.interface";
import { EnvService } from "../base/env.service";
import { EnvServiceInterface } from "../base/env.service.interface";
import { LoggerService } from "../base/logger.service";
import { LoggerServiceInterface } from "../base/logger.service.interface";
import { ErrorFilterInterface } from "../base/error.filter.interface";
import { ErrorFilter } from "../base/error.filter";
import { DbService } from "./db.service";
import { DbServiceInterface } from "./db.service.interface";
import { UserModel } from "./users/user.model";
import { UsersRegistryInterface } from "./users/users.registry.interface";
import { UsersRegistry } from "./users/users.registry";
import { UsersServiceInterface } from "./users/users.service.interface";
import { UsersService } from "./users/users.service";

const bindings = new ContainerModule((bind) => {
	bind<App>(Types.App).to(App);
	bind<UsersControllerInterface>(Types.UsersController).to(UsersController);
	bind<EnvServiceInterface>(Types.EnvService).to(EnvService).inSingletonScope();
	bind<LoggerServiceInterface>(Types.LoggerService).to(LoggerService);
	bind<ErrorFilterInterface>(Types.ErrorFilter).to(ErrorFilter);
	bind<DbServiceInterface>(Types.DbService).to(DbService);
	bind<typeof UserModel>(Types.UserModel).toConstantValue(UserModel);
	bind<UsersRegistryInterface>(Types.UsersRegistry).to(UsersRegistry);
	bind<UsersServiceInterface>(Types.UsersService).to(UsersService);
});

async function bootstrap() {
	const container = new Container();

	container.load(bindings);

	const app = container.get<App>(Types.App);

	app.init();
}

bootstrap();
