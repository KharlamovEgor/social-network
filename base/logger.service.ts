import { injectable } from "inversify";
import { Logger } from "tslog";
import { LoggerServiceInterface } from "./logger.service.interface";

@injectable()
export class LoggerService implements LoggerServiceInterface {
	logger: Logger;

	constructor() {
		this.logger = new Logger({
			displayFilePath: "hidden",
			displayFunctionName: false,
			displayInstanceName: false,
		});
	}

	info(message: string): void {
		this.logger.info(message);
	}

	warn(message: string): void {
		this.logger.warn(message);
	}

	error(message: string): void {
		this.logger.error(message);
	}
}
