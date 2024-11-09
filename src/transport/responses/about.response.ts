import { About, AboutDetailView } from '@/app/models';

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

	/**
	 * About setActive response
	 *
	 * @param payload
	 * @returns
	 */
	public setActive(payload: About | null) {
		if (!payload) return null;
		return {
			id: payload.id,
			is_active: payload.is_active,
		};
	}

	/**
	 * About detail response
	 *
	 * @param payload
	 * @returns
	 */
	public detail(payload: AboutDetailView | null) {
		if (!payload) return null;
		return payload;
	}
}
