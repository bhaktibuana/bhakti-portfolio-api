import { Response } from 'express';

import { Service } from '@/shared/libs/service.lib';
import {
	AboutCreateRequestBody,
	AboutSetActiveRequestBody,
	AboutSetActiveRequestParams,
} from '@/transport/requests/about.request';
import { Res } from '@/shared/types/express';
import { MySQL } from '@/shared/utils';
import { AboutRepository, SummaryRepository } from '@/app/repositories';
import { About } from '@/app/models';

export class AboutService extends Service {
	private summaryRepo: SummaryRepository;
	private aboutRepo: AboutRepository;

	constructor() {
		super();

		this.summaryRepo = new SummaryRepository();
		this.aboutRepo = new AboutRepository();
	}

	/**
	 * About create service
	 *
	 * @param res
	 * @param reqBody
	 * @returns
	 */
	public async create(
		res: Response,
		reqBody: AboutCreateRequestBody,
	): Promise<About | null> {
		const user = (res as Res).locals.user;

		const sequelize = MySQL.getMainDbConnection();
		const transaction = await sequelize.transaction();

		try {
			const summaryPayload = {
				english: reqBody.summary_english,
				indonesian: reqBody.summary_indonesian,
			};

			const summary = await this.summaryRepo.create(
				res,
				summaryPayload,
				transaction,
			);

			if (!summary)
				this.errorHandler(
					this.STATUS_CODE.BAD_REQUEST,
					'Failed to create sumamry',
				);

			const aboutPayload = {
				user_id: user.id as number,
				name: reqBody.name,
				title: reqBody.title,
				summary_id: summary!.id as number,
			};

			const about = await this.aboutRepo.create(
				res,
				aboutPayload,
				transaction,
			);

			if (!summary)
				this.errorHandler(
					this.STATUS_CODE.BAD_REQUEST,
					'Failed to create about',
				);

			await transaction.commit();

			return about;
		} catch (error) {
			await transaction.rollback();
			await this.catchErrorHandler(res, error, this.create.name);
		}
		return null;
	}

	public async setActive(
		res: Response,
		reqParams: AboutSetActiveRequestParams,
		reqBody: AboutSetActiveRequestBody,
	): Promise<About | null> {
		const user = (res as Res).locals.user;
		const aboutId = reqParams.id;

		try {
			const about = await this.aboutRepo.findOneById(res, aboutId, [
				'user_id',
			]);

			if (!about)
				this.errorHandler(
					this.STATUS_CODE.NOT_FOUND,
					'About data not found',
				);

			if (about?.user_id !== user.id)
				this.errorHandler(
					this.STATUS_CODE.FORBIDDEN,
					'You are not the owner of this about data',
				);

			if (reqBody.is_active) {
				await this.aboutRepo.setInactiveAll(res, user.id as number);
			}

			const updatedAbout = await this.aboutRepo.setActive(
				res,
				aboutId,
				reqBody.is_active,
			);

			return updatedAbout;
		} catch (error) {
			await this.catchErrorHandler(res, error, this.setActive.name);
		}
		return null;
	}
}
