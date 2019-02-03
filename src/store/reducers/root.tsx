import { authReducer, AuthState } from "@store/reducers/authReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers<StoreState>({
	auth: authReducer
});

export interface StoreState {
	auth: AuthState;
}
