import { MainLayout } from "@components/main/mainLayout/mainLayout";
import { AuthState } from "@store/reducers/authReducer";
import { StoreState } from "@store/reducers/root";
import { ReactNode } from "react";
import { connect } from "react-redux";
import { compose, Dispatch } from "redux";

export interface MainLayoutContainerProps {
	dark?: boolean;
	sidenav?: boolean;
	header?: boolean;
	contained?: boolean;
	renderItems?(isAuthenticated: boolean, user?: AuthState["user"]): NavItem[];
}

export interface NavItem {
	to: string;
	shouldRender: boolean;
	name: string | ReactNode;
	exact?: boolean;
	component?: ReactNode;
}

export const mapStateToProps = (state: StoreState) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		user: state.auth.user
	};
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
	return {};
};

export type StateProps = ReturnType<typeof mapStateToProps>;
export type DispatchProps = ReturnType<typeof mapDispatchToProps>;

const withRedux = connect(
	mapStateToProps,
	mapDispatchToProps
);

export const MainLayoutContainer = compose<React.ComponentType<MainLayoutContainerProps>>(
	withRedux
)(MainLayout);

export type MainLayoutProps = MainLayoutContainerProps & StateProps & DispatchProps;
