import { DotenvConfigOutput, config } from 'dotenv';
import { injectable } from 'inversify';
import { inject } from 'inversify';
import { Types } from '../src/Types';
import { EnvServiceInterface } from './env.service.interface';
import { LoggerServiceInterface } from './logger.service.interface';

@injectable()
export class EnvService implements EnvServiceInterface {
	data: DotenvConfigOutput;

	constructor(
		@inject(Types.LoggerService)
		private readonly loggerService: LoggerServiceInterface,
	) {
		this.data = config();

		if (!this.data.error) {
			this.loggerService.info('env loaded');
		} else {
			this.loggerService.error(this.data.error.message);
		}
	}

	get(key: string): string | null {
		if (this.data.parsed) {
			return this.data.parsed[key] || null;
		}

		return null;
	}
}
