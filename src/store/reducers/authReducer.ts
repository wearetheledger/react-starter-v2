import { login } from "@store/actions/auth/login";
import { logout } from "@store/actions/auth/logout";
import { AuthService } from "@utils/auth/authService";
import { IdToken } from "@utils/auth/idToken";
import { reducerWithInitialState } from "typescript-fsa-reducers";

const INITIAL_STATE: AuthState = {
	isAuthenticated: false
};

export interface AuthState {
	isAuthenticated: boolean;
	user?: IdToken;
}

const decodedToken = AuthService.getDecodedToken();

if (decodedToken) {
	INITIAL_STATE.isAuthenticated = true;
	INITIAL_STATE.user = decodedToken;
}

export const authReducer = reducerWithInitialState<AuthState>(INITIAL_STATE)
	.case(login, (state, props) => {
		const decoded = props.user ? props.user : AuthService.getDecodedToken(props.jwt);

		if (props.jwt) {
			AuthService.storeJwt(props.jwt);
		}

		return {
			...state,
			isAuthenticated: true,
			// tslint:disable-next-line: no-unsafe-any
			user: decoded
		};
	})
	.case(logout, (state, props) => {
		AuthService.logout();

		return {
			...state,
			isAuthenticated: false
		};
	});
