import { autobind } from "core-decorators";
import * as React from "react";

import { FormStepsProps } from "@components/common/formSteps/formStepsContainer";
import { FormStepsStyle } from "@components/common/formSteps/formStepsStyle";
import { Steps } from "antd";

interface State {}

@autobind
export class FormSteps extends React.Component<FormStepsProps, State> {
	public render() {
		return (
			<FormStepsStyle>
				<Steps
					direction="vertical"
					size={this.props.small ? "small" : "default"}
					current={this.props.step}>
					{this.renderSteps()}
				</Steps>
			</FormStepsStyle>
		);
	}

	private renderSteps() {
		return this.props.steps.map((value: Todo, index: number) => {
			return <Steps.Step key={index} title={value.title} />;
		});
	}
}
