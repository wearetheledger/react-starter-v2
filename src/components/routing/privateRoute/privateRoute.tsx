// tslint:disable: react-this-binding-issue
import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router";

import { StoreState } from "@store/reducers/root";

export type StateProps = ReturnType<typeof mapStateToProps>;

export interface PrivateRouteProps extends RouteProps {
	noRedirect?: boolean;
}

const PrivateRouteComponent: React.StatelessComponent<PrivateRouteProps & StateProps> = ({
	component: Component,
	isAuthenticated,
	render,
	noRedirect,
	...rest
}) => {
	const state = noRedirect ? {} : { redirectFrom: rest.location };

	return (
		<Route
			{...rest}
			render={props => {
				if (isAuthenticated) {
					if (Component) {
						return <Component {...props} />;
					} else if (render) {
						return render(props);
					}
				}

				return (
					<Redirect
						to={{
							pathname: "/login",
							state
						}}
					/>
				);
			}}
		/>
	);
};

export const mapStateToProps = (state: StoreState) => {
	return {
		isAuthenticated: state.auth.isAuthenticated
	};
};

export const PrivateRoute = connect<StateProps, {}, PrivateRouteProps, StoreState>(mapStateToProps)(
	PrivateRouteComponent
);
