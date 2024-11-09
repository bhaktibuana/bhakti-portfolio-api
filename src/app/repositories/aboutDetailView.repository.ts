import { Response } from 'express';
import { FindAttributeOptions } from 'sequelize';

import { Repository } from '@/shared/libs/repository.lib';
import { AboutDetailView } from '@/app/models';

export class AboutDetailViewRepository extends Repository {
	constructor() {
		super();
	}

	/**
	 * Find one record by user_id
	 *
	 * @param res
	 * @param userId
	 * @param attributes
	 * @returns
	 */
	public async findOneByUserId(
		res: Response,
		userId: number,
		attributes: FindAttributeOptions | undefined = undefined,
	): Promise<AboutDetailView | null> {
		let result: AboutDetailView | null = null;

		try {
			result = await AboutDetailView.findOne({
				where: { user_id: userId },
				attributes,
			});
		} catch (error) {
			await this.catchErrorHandler(res, error, this.findOneByUserId.name);
		}
		return result;
	}
}
