import { StoreState } from "@store/reducers/root";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";

const mockedStore = configureMockStore<StoreState>()({
	auth: {
		isAuthenticated: false
	}
});

export const createRendererWithProvider = (children: ReactNode) => (store = mockedStore) =>
	renderer.create(
		<MemoryRouter initialEntries={["/"]}>
			<Provider store={store}>{children}</Provider>
		</MemoryRouter>
	);
