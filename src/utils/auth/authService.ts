import * as jsonwebtoken from "jsonwebtoken";
import { IdToken } from "./idToken";

export class AuthService {
	public static storeJwt(jwt: string) {
		localStorage.setItem("token", jwt);
	}

	public static getJwt() {
		return localStorage.getItem("token");
	}

	public static logout() {
		localStorage.removeItem("token");
	}

	public static getDecodedToken<T extends IdToken>(jwt?: string) {
		const token = jwt || localStorage.getItem("token");

		if (!token) {
			return undefined;
		}

		const decodedToken = jsonwebtoken.decode(token) as T;

		if (this.isValid(decodedToken)) {
			return decodedToken;
		}

		return undefined;
	}

	public static isValid(token: IdToken) {
		const now = new Date().getTime() / 1000;

		// 15 minutes minimum duration until token expires
		const minimumDuration = 60 * 15;

		return token.exp - now > minimumDuration;
	}
}
