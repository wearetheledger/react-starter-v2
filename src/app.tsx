import { PrivateRoute } from "@components/common/privateRoute/privateRoute";
import { MainLayoutContainer, NavItem } from "@components/main/mainLayout/mainLayoutContainer";
import { LoginContainer } from "@pages/auth/login/loginContainer";
import { LoginSuccessContainer } from "@pages/auth/loginSuccess/loginSuccessContainer";
import { MainContainer } from "@pages/main/mainContainer";
import { logout } from "@store/actions/auth/logout";
import { configureStore } from "@store/configureStore";
import { Icon } from "antd";
import * as React from "react";
import { addLocaleData, FormattedMessage, IntlProvider } from "react-intl";
import nlLocaleData from "react-intl/locale-data/nl";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { FormPageContainer } from "@pages/formPage/formPageContainer";

addLocaleData([...nlLocaleData]);

const messages = require("./translations/nl.json");

const { store } = configureStore({});

const renderNav = (isAuthenticated: boolean): NavItem[] => {
	return [
		{
			name: <FormattedMessage id="home" />,
			shouldRender: isAuthenticated,
			to: "/",
			exact: true,
			icon: <Icon type="home" />
		},
		{
			name: <FormattedMessage id="logout" />,
			shouldRender: isAuthenticated,
			to: "/logout",
			icon: <Icon type="logout" />
		}
	];
};

export const App: React.StatelessComponent = () => (
	<Provider store={store}>
		<IntlProvider messages={messages} locale="nl-BE">
			<BrowserRouter>
				<Switch>
					<Route path="/login/succes" component={LoginSuccessContainer} />
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
								<PrivateRoute
									exact
									path="/aanvraag/:applicationId"
									component={FormPageContainer}
								/>
								<PrivateRoute exact path="/" component={MainContainer} />
							</MainLayoutContainer>
						)}
					/>
				</Switch>
			</BrowserRouter>
		</IntlProvider>
	</Provider>
);
