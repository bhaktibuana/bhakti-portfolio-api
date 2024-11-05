import { Response } from 'express';
import {
	FindAttributeOptions,
	InferCreationAttributes,
	Transaction,
	WhereOptions,
} from 'sequelize';
import dayjs from 'dayjs';

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

	/**
	 * Find one record
	 *
	 * @param res
	 * @param where
	 * @param attributes
	 * @returns
	 */
	public async findOne(
		res: Response,
		where: WhereOptions<About>,
		attributes: FindAttributeOptions | undefined = undefined,
	): Promise<About | null> {
		let result: About | null = null;

		try {
			result = await About.findOne({ where, attributes });
		} catch (error) {
			await this.catchErrorHandler(res, error, this.findOne.name);
		}
		return result;
	}

	/**
	 * Find one record by id
	 *
	 * @param res
	 * @param id
	 * @param attributes
	 * @returns
	 */
	public async findOneById(
		res: Response,
		id: number,
		attributes: FindAttributeOptions | undefined = undefined,
	): Promise<About | null> {
		let result: About | null = null;

		try {
			result = await this.findOne(res, { id }, attributes);
		} catch (error) {
			await this.catchErrorHandler(res, error, this.findOneById.name);
		}
		return result;
	}

	/**
	 * Set active record
	 *
	 * @param res
	 * @param id
	 * @param is_active
	 * @returns
	 */
	public async setActive(
		res: Response,
		id: number,
		is_active: boolean,
	): Promise<About | null> {
		let result: About | null = null;

		try {
			await About.update(
				{ is_active, updated_at: dayjs() },
				{ where: { id } },
			);
			result = await this.findOneById(res, id);
		} catch (error) {
			await this.catchErrorHandler(res, error, this.setActive.name);
		}
		return result;
	}

	/**
	 * Set inactive all record
	 *
	 * @param res
	 * @param user_id
	 * @returns
	 */
	public async setInactiveAll(
		res: Response,
		user_id: number,
	): Promise<boolean> {
		let result: boolean = false;

		try {
			await About.update(
				{ is_active: false, updated_at: dayjs() },
				{ where: { user_id } },
			);
			result = true;
		} catch (error) {
			result = false;
			await this.catchErrorHandler(res, error, this.setInactiveAll.name);
		}
		return result;
	}
}
