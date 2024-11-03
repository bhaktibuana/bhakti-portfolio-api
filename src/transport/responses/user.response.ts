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

	/**
	 * User Login Response
	 *
	 * @param payload
	 * @returns
	 */
	public login(payload: { user: User | null; token: string } | null) {
		if (!payload || !payload.user) return null;
		return {
			id: payload.user.id,
			email: payload.user.email,
			token: payload.token,
		};
	}
}
