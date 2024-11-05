import { Response } from 'express';

import { Repository } from '@/shared/libs/repository.lib';
import { User } from '@/app/models';

export class UserRepository extends Repository {
	constructor() {
		super();
	}

	/**
	 * Find One by Email
	 *
	 * @param res
	 * @param email
	 * @returns
	 */
	public async findOneByEmail(
		res: Response,
		email: string,
	): Promise<User | null> {
		let result: User | null = null;

		try {
			result = await User.findOne({
				where: { email },
				attributes: ['id', 'email'],
			});
		} catch (error) {
			await this.catchErrorHandler(res, error, this.findOneByEmail.name);
		}
		return result;
	}

	/**
	 * Create User
	 *
	 * @param res
	 * @param email
	 * @param password
	 * @returns
	 */
	public async create(
		res: Response,
		email: string,
		password: string,
	): Promise<User | null> {
		let result: User | null = null;

		try {
			result = await User.create({ email, password });
		} catch (error) {
			await this.catchErrorHandler(res, error, this.create.name);
		}
		return result;
	}

	/**
	 * Find One by Email and Password
	 *
	 * @param res
	 * @param email
	 * @param password
	 * @returns
	 */
	public async findLogin(
		res: Response,
		email: string,
		password: string,
	): Promise<User | null> {
		let result: User | null = null;

		try {
			result = await User.findOne({
				where: { email, password },
				attributes: ['id', 'email'],
			});
		} catch (error) {
			await this.catchErrorHandler(res, error, this.findLogin.name);
		}
		return result;
	}

	/**
	 * Find One User by id
	 *
	 * @param res
	 * @param id
	 * @returns
	 */
	public async findById(res: Response, id: number): Promise<User | null> {
		let result: User | null = null;

		try {
			result = await User.findOne({
				where: { id },
				attributes: {
					exclude: ['password'],
				},
			});
		} catch (error) {
			await this.catchErrorHandler(res, error, this.findById.name);
		}
		return result;
	}
}
