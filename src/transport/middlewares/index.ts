import { BaseMiddleware } from '@/transport/middlewares/base.middleware';
import { Next, Req, Res } from '@/shared/types/express';

export class Middleware extends BaseMiddleware {
	constructor() {
		super();
	}

	/**
	 * Example middleware
	 *
	 * @param req
	 * @param res
	 * @param next
	 */
	public async example(req: Req, res: Res, next: Next): Promise<void> {}
}
