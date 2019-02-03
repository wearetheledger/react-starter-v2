import { login } from "@store/actions/auth/login";
import { logout } from "@store/actions/auth/logout";
import { Auth0IdToken, auth0Provider } from "@utils/auth/auth0Provider";
import RSA from "react-simple-auth";
import { reducerWithInitialState } from "typescript-fsa-reducers";

const INITIAL_STATE: AuthState = {
	isAuthenticated: false
};

export interface AuthState {
	isAuthenticated: boolean;
	user?: Auth0IdToken;
}

const session = RSA.restoreSession(auth0Provider);

if (session) {
	INITIAL_STATE.isAuthenticated = true;
	INITIAL_STATE.user = session.decodedIdToken;
}

export const authReducer = reducerWithInitialState<AuthState>(INITIAL_STATE)
	.case(login, (state, props) => ({
		...state,
		isAuthenticated: true,
		// tslint:disable-next-line: no-unsafe-any
		user: props.user
	}))
	.case(logout, (state, props) => {
		RSA.invalidateSession();

		return {
			...state,
			isAuthenticated: false
		};
	});
