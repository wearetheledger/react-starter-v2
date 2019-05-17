// tslint:disable: no-non-null-assertion no-null-keyword

import { AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_DOMAIN } from "@utils/env";
import { IdToken } from "@utils/types/IdToken";
import { IProvider } from "react-simple-auth";

export interface Auth0IdToken extends IdToken {
	nonce: string;
	"https://theledger.be/role": string;
	at_hash: string;
}

export interface Session {
	accessToken: string;
	idToken: string;
	decodedIdToken: Auth0IdToken;
}

export const auth0Provider: IProvider<Session> = {
	buildAuthorizeUrl(): string {
		const nonce = getNonce();

		localStorage.setItem("nonce", nonce);

		return singleLineString`https://${AUTH0_DOMAIN}/authorize?response_type=id_token+token&client_id=${AUTH0_CLIENT_ID}
        &redirect_uri=${window.location.origin}/redirect.html
        &nonce=${nonce}
        &audience=${AUTH0_AUDIENCE}`;
	},

	extractError(redirectUrl: string): Error | undefined {
		const errorMatch = redirectUrl.match(/error=([^&]+)/);

		if (!errorMatch) {
			return undefined;
		}

		const errorReason = errorMatch[1];
		const errorDescriptionMatch = redirectUrl.match(/error_description=([^&]+)/);
		const errorDescription = errorDescriptionMatch ? errorDescriptionMatch[1] : "";

		return new Error(
			`Error during login. Reason: ${errorReason} Description: ${decodeURIComponent(
				errorDescription
			)}`
		);
	},

	extractSession(redirectUrl: string): Session {
		let accessToken: string = null!;
		const accessTokenMatch = redirectUrl.match(/access_token=([^&]+)/);
		if (accessTokenMatch) {
			accessToken = accessTokenMatch[1];
		}

		let idToken: string = null!;
		let decodedIdToken: Auth0IdToken = null!;
		const idTokenMatch = redirectUrl.match(/id_token=([^&]+)/);
		if (idTokenMatch) {
			idToken = idTokenMatch[1];
			decodedIdToken = JSON.parse(atob(idToken.split(".")[1])) as Auth0IdToken;

			// Check nonce for replay-attack https://auth0.com/docs/api-auth/tutorials/nonce
			if (decodedIdToken.nonce !== localStorage.getItem("nonce")) {
				throw new Error("Nonce incorrect");
			}
		}

		return {
			accessToken,
			idToken,
			decodedIdToken
		};
	},

	validateSession(session: Session): boolean {
		const now = new Date().getTime() / 1000;

		// 15 minutes minimum duration until token expires
		const minimumDuration = 60 * 15;

		return session.decodedIdToken.exp - now > minimumDuration;
	},

	getAccessToken(session: Session, resourceId: string): string {
		return session.accessToken;
	},

	getSignOutUrl(redirectUrl: string): string {
		return "";
	}
};

// tslint:disable-next-line: no-any
function singleLineString(strings: TemplateStringsArray, ...values: any[]) {
	// Interweave the strings with the
	// substitution vars first.
	let output = "";
	// tslint:disable-next-line: no-increment-decrement
	for (let i = 0; i < values.length; i++) {
		// tslint:disable-next-line: restrict-plus-operands
		output += strings[i] + values[i];
	}
	output += strings[values.length];

	// Split on newlines.
	const lines = output.split(/(?:\r\n|\n|\r)/);

	// Rip out the leading whitespace.
	return lines
		.map(line => {
			return line.replace(/^\s+/gm, "");
		})
		.join("")
		.trim();
}

function getNonce() {
	const validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let array = new Uint8Array(40);
	crypto.getRandomValues(array);
	array = array.map(x => validChars.charCodeAt(x % validChars.length));

	return String.fromCharCode.apply(undefined, array as any);
}
