import { StoreState } from "@store/reducers/root";
import React, { ReactNode } from "react";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";

const mockedStore = configureMockStore<StoreState>()({
	auth: {
		isAuthenticated: false
	}
});

export const createRendererWithProvider = (children: ReactNode) => (
	store = mockedStore,
	messages = {}
) =>
	renderer.create(
		<MemoryRouter initialEntries={["/"]}>
			<IntlProvider messages={messages} locale="nl-BE">
				<Provider store={store}>{children}</Provider>
			</IntlProvider>
		</MemoryRouter>
	);
