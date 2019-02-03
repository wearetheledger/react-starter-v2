import { Login } from "@pages/auth/login/login";
import { login } from "@store/actions/auth/login";
import { AuthState } from "@store/reducers/authReducer";
import { StoreState } from "@store/reducers/root";
import { Form } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { compose, Dispatch } from "redux";

export interface LoginContainerProps {}

export const mapStateToProps = (state: StoreState) => {
	return {
		isAuthenticated: state.auth.isAuthenticated
	};
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		login: (user: AuthState["user"]) => dispatch(login({ user }))
	};
};

export type StateProps = ReturnType<typeof mapStateToProps>;
export type DispatchProps = ReturnType<typeof mapDispatchToProps>;

const withRedux = connect(
	mapStateToProps,
	mapDispatchToProps
);

const withForm = Form.create();

export const LoginContainer = compose<React.ComponentType<LoginContainerProps>>(
	withRedux,
	withForm,
	injectIntl
)(Login);

export type LoginProps = LoginContainerProps &
	StateProps &
	DispatchProps &
	FormComponentProps &
	InjectedIntlProps &
	RouteComponentProps<{}, {}, { redirectFrom: string }>;
