import { Response } from 'express';
import { InferCreationAttributes, Transaction } from 'sequelize';

import { Repository } from '@/shared/libs/repository.lib';
import { About } from '@/app/models';

export class AboutRepository extends Repository {
	constructor() {
		super();
	}

	/**
	 * Create about
	 *
	 * @param res
	 * @param payload
	 * @param transaction
	 * @returns
	 */
	public async create(
		res: Response,
		payload: InferCreationAttributes<About>,
		transaction: Transaction | null = null,
	): Promise<About | null> {
		let result: About | null = null;

		try {
			result = await About.create(payload, { transaction });
		} catch (error) {
			await this.catchErrorHandler(res, error, this.create.name);
		}
		return result;
	}
}
