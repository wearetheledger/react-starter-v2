import { connect } from "react-redux";
import { compose, Dispatch } from "redux";

import { StoreState } from "@store/reducers/root";

import { FormPage } from "@pages/formPage/formPage";
import { RouteComponentProps } from "react-router";

export interface FormPageContainerProps {}

export const mapStateToProps = (state: StoreState) => {
	return {};
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

export const FormPageContainer = compose<React.ComponentType<FormPageContainerProps>>(withRedux)(
	FormPage
);

export type FormPageProps = FormPageContainerProps &
	RouteComponentProps<{ applicationId: string }> &
	StateProps &
	DispatchProps;
