import { NextFunction, Request, Response } from 'express';

import { User } from '@/app/models/user.model';

declare namespace e {
	type Next = NextFunction;
	type Req = Request;

	type Res = Response<
		any,
		{
			base_url: string;
			request_id: string;
			user: User;
		}
	>;
}

export = e;
