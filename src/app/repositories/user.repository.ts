import { Response } from 'express';

import { Repository } from '@/shared/libs/repository.lib';
import { User } from '@/app/models/user.model';

export class UserRepository extends Repository {
	constructor() {
		super();
	}

	/**
	 * Find One by Email
	 *
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
}
