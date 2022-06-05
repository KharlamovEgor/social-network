import { inject, injectable } from "inversify";
import { EnvServiceInterface } from "../base/env.service.interface";
import { LoggerServiceInterface } from "../base/logger.service.interface";
import { DbServiceInterface } from "./db.service.interface";
import { Types } from "./Types";
import mongoose, { connect } from "mongoose";

@injectable()
export class DbService implements DbServiceInterface {
	db: typeof mongoose;

	constructor(
		@inject(Types.LoggerService)
		private loggerService: LoggerServiceInterface,
		@inject(Types.EnvService) private envService: EnvServiceInterface
	) {}

	async connect(): Promise<void> {
		try {
			this.db = await connect(
				`mongodb://${this.envService.get("MONGO_USER")}:${this.envService.get(
					"MONGO_PASSWORD"
				)}@${this.envService.get("MONGO_HOST")}:${this.envService.get(
					"MONGO_PORT"
				)}/${this.envService.get("MONGO_DB")}`
			);
			this.loggerService.info("db connected");
		} catch {
			this.loggerService.error("some error occur, db didn't connect");
		}
	}

	async disconnect(): Promise<void> {
		await this.db.disconnect();
	}
}
