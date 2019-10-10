import { connect } from "react-redux";
import { compose, Dispatch } from "redux";

import { StoreState } from "@store/reducers/root";

import { FormSteps } from "@components/common/formSteps/formSteps";

export interface FormStepsContainerProps {
	steps: Todo[];
	step: number;
	small?: boolean;
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

export const FormStepsContainer = compose<React.ComponentType<FormStepsContainerProps>>(withRedux)(
	FormSteps
);

export type FormStepsProps = FormStepsContainerProps & StateProps & DispatchProps;
