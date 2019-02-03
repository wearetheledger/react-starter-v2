import { AuthState } from "@store/reducers/authReducer";
import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory("@@AUTH");

export interface LoginActionProperties {
	user: AuthState["user"];
}

export const login = actionCreator<LoginActionProperties>("LOGIN");
