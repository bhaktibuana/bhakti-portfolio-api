import { User } from '@/app/models/user.model';

export class UserResponse {
	/**
	 * User Register Response
	 *
	 * @param payload
	 * @returns
	 */
	public register(payload: User | null) {
		if (!payload) return null;
		return {
			id: payload.id,
			email: payload.email,
		};
	}
}
