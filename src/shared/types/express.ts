import { NextFunction, Request, Response } from 'express';

import { T_UserAuth } from '@/shared/types';

declare namespace e {
	type Next = NextFunction;
	type Req = Request;

	type Res = Response<
		any,
		{
			base_url: string;
			request_id: string;
			user: T_UserAuth;
		}
	>;
}

export = e;
