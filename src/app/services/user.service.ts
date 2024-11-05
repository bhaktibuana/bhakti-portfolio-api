import { Response } from 'express';

import { Helper } from '@/shared/helpers';
import { Service } from '@/shared/libs/service.lib';
import {
	UserLoginRequestBody,
	UserRegisterRequestBody,
} from '@/transport/requests/user.request';
import { UserRepository } from '@/app/repositories';
import { User } from '@/app/models';

export class UserService extends Service {
	private userRepo: UserRepository;

	constructor() {
		super();

		this.userRepo = new UserRepository();
	}

	/**
	 * User Register Service
	 *
	 * @param res
	 * @param reqBody
	 * @returns
	 */
	public async register(
		res: Response,
		reqBody: UserRegisterRequestBody,
	): Promise<User | null> {
		try {
			const payload = {
				email: reqBody.email.toLowerCase(),
				password: Helper.hash(reqBody.password),
			};

			const user = await this.userRepo.findOneByEmail(res, payload.email);
			if (user)
				this.errorHandler(
					this.STATUS_CODE.BAD_REQUEST,
					'Email already exist',
				);

			return await this.userRepo.create(
				res,
				payload.email,
				payload.password,
			);
		} catch (error) {
			await this.catchErrorHandler(res, error, this.register.name);
		}
		return null;
	}

	/**
	 * User Login Service
	 *
	 * @param res
	 * @param reqBody
	 * @returns
	 */
	public async login(res: Response, reqBody: UserLoginRequestBody) {
		try {
			const payload = {
				email: reqBody.email.toLowerCase(),
				password: Helper.hash(reqBody.password),
			};

			const user = await this.userRepo.findLogin(
				res,
				payload.email,
				payload.password,
			);

			if (!user)
				this.errorHandler(
					this.STATUS_CODE.NOT_FOUND,
					'Wrong email or password',
				);

			const token = Helper.generateJWT(user!.dataValues, '7d');

			return { user, token };
		} catch (error) {
			await this.catchErrorHandler(res, error, this.login.name);
		}
		return null;
	}

	/**
	 * User Me Service
	 *
	 * @param res
	 * @param id
	 * @returns
	 */
	public async me(res: Response, id: number): Promise<User | null> {
		try {
			const user = await this.userRepo.findById(res, id);

			if (!user)
				this.errorHandler(this.STATUS_CODE.NOT_FOUND, 'User not found');

			return user;
		} catch (error) {
			await this.catchErrorHandler(res, error, this.me.name);
		}
		return null;
	}
}
