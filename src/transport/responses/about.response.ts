import { About } from '@/app/models';

export class AboutResponse {
	/**
	 * About create response
	 *
	 * @param payload
	 * @returns
	 */
	public create(payload: About | null) {
		if (!payload) return null;
		return {
			id: payload.id,
		};
	}
}
