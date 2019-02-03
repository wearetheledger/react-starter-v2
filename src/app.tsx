// tslint:disable: react-this-binding-issue
import { MainLayoutContainer, NavItem } from "@components/main/mainLayout/mainLayoutContainer";
import { PrivateRoute } from "@components/routing/privateRoute/privateRoute";
import { LoginContainer } from "@pages/auth/login/loginContainer";
import { MainContainer } from "@pages/main/mainContainer";
import { logout } from "@store/actions/auth/logout";
import { configureStore } from "@store/configureStore";
import * as React from "react";
import { addLocaleData, FormattedMessage, IntlProvider } from "react-intl";
import * as nl from "react-intl/locale-data/nl";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

addLocaleData([...nl]);

const messages = require("./translations/nl.json");

const { store } = configureStore({});

const renderNav = (isAuthenticated: boolean): NavItem[] => {
	return [
		{
			name: <FormattedMessage id="home" />,
			shouldRender: isAuthenticated,
			to: "/",
			exact: true
		},
		{
			name: <FormattedMessage id="logout" />,
			shouldRender: isAuthenticated,
			to: "/logout"
		}
	];
};

export const App: React.StatelessComponent = () => (
	<Provider store={store}>
		<IntlProvider messages={messages} locale="nl-BE">
			<BrowserRouter>
				<Switch>
					<Route path="/login" component={LoginContainer} />
					<PrivateRoute
						noRedirect
						path="/logout"
						render={() => {
							store.dispatch(logout({}));

							return null;
						}}
					/>
					<Route
						path="*"
						render={() => (
							<MainLayoutContainer renderItems={renderNav}>
								<PrivateRoute exact path="/" component={MainContainer} />
							</MainLayoutContainer>
						)}
					/>
				</Switch>
			</BrowserRouter>
		</IntlProvider>
	</Provider>
);
