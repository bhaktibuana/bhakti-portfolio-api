import { Response } from 'express';
import { InferCreationAttributes, Transaction } from 'sequelize';

import { Repository } from '@/shared/libs/repository.lib';
import { Summary } from '@/app/models';

export class SummaryRepository extends Repository {
	constructor() {
		super();
	}

	/**
	 * Create summary
	 *
	 * @param res
	 * @param payload
	 * @param transaction
	 * @returns
	 */
	public async create(
		res: Response,
		payload: InferCreationAttributes<Summary>,
		transaction: Transaction | null = null,
	): Promise<Summary | null> {
		let result: Summary | null = null;

		try {
			result = await Summary.create(payload, { transaction });
		} catch (error) {
			await this.catchErrorHandler(res, error, this.create.name);
		}
		return result;
	}
}
