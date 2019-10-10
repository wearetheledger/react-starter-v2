import { connect } from "react-redux";
import { compose, Dispatch } from "redux";

import { StoreState } from "@store/reducers/root";

import { FormWrapper } from "@components/form/formWrapper/formWrapper";

export interface FormWrapperContainerProps {
	steps: Todo[];
	step: number;
	submitForm(formData: Todo): void;
}

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

export const FormWrapperContainer = compose<React.ComponentType<FormWrapperContainerProps>>(
	withRedux
)(FormWrapper);

export type FormWrapperProps = FormWrapperContainerProps & StateProps & DispatchProps;
