import 'reflect-metadata';
import { Container, ContainerModule } from 'inversify';
import { App } from './App';
import { Types } from './Types';
import { UsersController } from './users/users.controller';
import { UsersControllerInterface } from './users/users.controller.interface';
import { EnvService } from '../base/env.service';
import { EnvServiceInterface } from '../base/env.service.interface';
import { LoggerService } from '../base/logger.service';
import { LoggerServiceInterface } from '../base/logger.service.interface';
import { ErrorFilterInterface } from '../base/error.filter.interface';
import { ErrorFilter } from '../base/error.filter';
import { DbService } from './db.service';
import { DbServiceInterface } from './db.service.interface';
import { UserModel } from './users/user.model';
import { UsersRegistryInterface } from './users/users.registry.interface';
import { UsersRegistry } from './users/users.registry';
import { UsersServiceInterface } from './users/users.service.interface';
import { UsersService } from './users/users.service';
import { ImagesControllerInterface } from './images/images.controller.interface';
import { ImagesController } from './images/images.controller';
import { ImagesService } from './images/images.service';
import { ImagesServiceInterface } from './images/images.service.interface';
import { MessageModel } from './messages/message.model';
import { AuthControllerInterface } from './auth/auth.controller.interface';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthServiceInterface } from './auth/auth.service.interface';
import { MessagesController } from './messages/messages.controller';
import { MessagesServiceInterface } from './messages/messages.service.interface';
import { MessagesService } from './messages/messages.service';
import { MessagesControllerInterface } from './messages/messages.controller.interface';
import { MessagesRegistry } from './messages/messages.registry';
import { MessagesRegistryInterface } from './messages/messages.registry.interface';

const bindings = new ContainerModule((bind) => {
	bind<App>(Types.App).to(App);
	bind<UsersControllerInterface>(Types.UsersController).to(UsersController);
	bind<EnvServiceInterface>(Types.EnvService).to(EnvService).inSingletonScope();
	bind<LoggerServiceInterface>(Types.LoggerService).to(LoggerService);
	bind<ErrorFilterInterface>(Types.ErrorFilter).to(ErrorFilter);
	bind<DbServiceInterface>(Types.DbService).to(DbService);
	bind<typeof UserModel>(Types.UserModel).toConstantValue(UserModel);
	bind<typeof MessageModel>(Types.MessageModel).toConstantValue(MessageModel);
	bind<UsersRegistryInterface>(Types.UsersRegistry).to(UsersRegistry);
	bind<UsersServiceInterface>(Types.UsersService).to(UsersService);
	bind<ImagesControllerInterface>(Types.ImagesController).to(ImagesController);
	bind<ImagesServiceInterface>(Types.ImagesService).to(ImagesService);
	bind<AuthControllerInterface>(Types.AuthController).to(AuthController);
	bind<AuthServiceInterface>(Types.AuthService).to(AuthService);
	bind<MessagesControllerInterface>(Types.MessagesController).to(MessagesController);
	bind<MessagesServiceInterface>(Types.MessagesService).to(MessagesService);
	bind<MessagesRegistryInterface>(Types.MessageRegistry).to(MessagesRegistry);
});

async function bootstrap() {
	const container = new Container();

	container.load(bindings);

	const app = container.get<App>(Types.App);

	app.init();
}

bootstrap();
