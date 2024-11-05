import { Request, Response } from 'express';

import { Controller } from '@/shared/libs/controller.lib';
import { AboutService } from '@/app/services';
import { AboutCreateRequestBody } from '@/transport/requests/about.request';
import { AboutResponse } from '@/transport/responses/about.response';

export class AboutController extends Controller {
	private aboutSvc: AboutService;
	private aboutRes: AboutResponse;

	constructor() {
		super();

		this.aboutSvc = new AboutService();
		this.aboutRes = new AboutResponse();
	}

	/**
	 * About create controller
	 *
	 * @param req
	 * @param res
	 */
	public async create(req: Request, res: Response): Promise<void> {
		try {
			const reqBody = await this.getRequestBody(
				AboutCreateRequestBody,
				req,
			);

			const result = await this.aboutSvc.create(res, reqBody);

			this.response(
				res,
				'Create about success',
				this.STATUS_CODE.CREATED,
				this.aboutRes.create(result),
			);
		} catch (error) {
			await this.catchErrorHandler(res, error, this.create.name);
		}
	}
}
