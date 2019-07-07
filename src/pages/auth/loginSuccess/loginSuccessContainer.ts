import { LoginSuccess } from "@pages/auth/loginSuccess/loginSuccess";
import { login } from "@store/actions/auth/login";
import { StoreState } from "@store/reducers/root";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { compose, Dispatch } from "redux";

export interface LoginSuccessContainerProps {}

export const mapStateToProps = (state: StoreState) => {
	return {
		isAuthenticated: state.auth.isAuthenticated
	};
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		login: (jwt: string) => dispatch(login({ jwt }))
	};
};

export type StateProps = ReturnType<typeof mapStateToProps>;
export type DispatchProps = ReturnType<typeof mapDispatchToProps>;

const withRedux = connect(
	mapStateToProps,
	mapDispatchToProps
);

export const LoginSuccessContainer = compose<React.ComponentType<LoginSuccessContainerProps>>(
	withRedux
)(LoginSuccess);

export type LoginSuccessProps = LoginSuccessContainerProps &
	RouteComponentProps &
	StateProps &
	DispatchProps;
