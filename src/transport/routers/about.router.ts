import { Router as ExpressRouter } from 'express';

import { Router } from '@/shared/libs/router.lib';
import { AboutController } from '@/app/controllers';

export class AboutRouter extends Router<AboutController> {
	constructor(router: ExpressRouter) {
		super(router, '/about', new AboutController());

		this.post('/create', this.controller.create, ['auth', 'admin']);
		this.put('/:id/set-active', this.controller.setActive, ['auth', 'admin']);
	}
}
