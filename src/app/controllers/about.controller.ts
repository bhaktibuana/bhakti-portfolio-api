import { Request, Response } from 'express';

import { Controller } from '@/shared/libs/controller.lib';
import { AboutService } from '@/app/services';
import {
	AboutCreateRequestBody,
	AboutSetActiveRequestBody,
	AboutSetActiveRequestParams,
} from '@/transport/requests/about.request';
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

	/**
	 * About set is_active true or false controller
	 *
	 * @param req
	 * @param res
	 */
	public async setActive(req: Request, res: Response): Promise<void> {
		try {
			const reqParams = await this.getRequestParams(
				AboutSetActiveRequestParams,
				req,
			);

			const reqBody = await this.getRequestBody(
				AboutSetActiveRequestBody,
				req,
			);

			const result = await this.aboutSvc.setActive(
				res,
				reqParams,
				reqBody,
			);

			this.response(
				res,
				'Set active success',
				this.STATUS_CODE.OK,
				this.aboutRes.setActive(result),
			);
		} catch (error) {
			await this.catchErrorHandler(res, error, this.setActive.name);
		}
	}
}
