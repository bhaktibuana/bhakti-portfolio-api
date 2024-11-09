import { BaseMiddleware } from '@/transport/middlewares/base.middleware';
import { Next, Req, Res } from '@/shared/types/express';
import { UserService } from '@/app/services';
import { User } from '@/app/models';
import { Helper } from '@/shared/helpers';
import { T_UserAuth } from '@/shared/types';

export class Middleware extends BaseMiddleware {
	private userSvc: UserService;

	constructor() {
		super();

		this.userSvc = new UserService();
	}

	/**
	 * Auth Middleware
	 *
	 * @param req
	 * @param res
	 * @param next
	 */
	public async auth(req: Req, res: Res, next: Next): Promise<void> {
		try {
			if (!req.headers.authorization)
				this.errorHandler(
					this.STATUS_CODE.UNAUTHORIZED,
					'Unauthorized',
				);

			const splitToken = (req.headers.authorization as string).split(' ');
			if (splitToken.length !== 2 || splitToken[0] !== 'Bearer')
				this.errorHandler(
					this.STATUS_CODE.BAD_REQUEST,
					'Wrong authorization format',
				);

			const { error, decoded } = Helper.verifyJWT<User>(splitToken[1]);
			if (error)
				this.errorHandler(
					this.STATUS_CODE.UNAUTHORIZED,
					error.message,
					error,
				);

			const user = await this.userSvc.me(
				res,
				(decoded as User['dataValues']).id as number,
			);

			if (user) {
				res.locals.user = user.dataValues as T_UserAuth;
			} else {
				this.errorHandler(
					this.STATUS_CODE.BAD_REQUEST,
					'Failed to get user data',
				);
			}

			next();
		} catch (error) {
			await this.catchErrorHandler(res, error, this.auth.name);
		}
	}

	/**
	 * Is admin validation middleware
	 *
	 * @param _req
	 * @param res
	 * @param next
	 */
	public async admin(_req: Req, res: Res, next: Next): Promise<void> {
		try {
			const user = res.locals.user;
			const isAdmin = user.is_admin;

			if (!isAdmin)
				this.errorHandler(
					this.STATUS_CODE.FORBIDDEN,
					'Admin access only',
				);

			next();
		} catch (error) {
			await this.catchErrorHandler(res, error, this.admin.name);
		}
	}
}
