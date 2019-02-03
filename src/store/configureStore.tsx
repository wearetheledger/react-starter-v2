import { rootReducer, StoreState } from "@store/reducers/root";
import { compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

export const configureStore = (initialState?: Partial<StoreState>) => {
	const store = createStore(
		rootReducer,
		initialState,
		process.env.NODE_ENV === "production"
			? compose()
			: composeWithDevTools()
	);

	return { store };
};
