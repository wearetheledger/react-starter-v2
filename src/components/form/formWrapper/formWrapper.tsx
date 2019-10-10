import { autobind } from "core-decorators";
import * as React from "react";

import { FormWrapperProps } from "@components/form/formWrapper/formWrapperContainer";
import { FormWrapperStyle, FormControls } from "@components/form/formWrapper/formWrapperStyle";
import Form from "react-jsonschema-form";
import { Button } from "antd";

interface State {}

@autobind
export class FormWrapper extends React.Component<FormWrapperProps, State> {
	public render() {
		const { submitForm, step, steps } = this.props;
		const formControlClass = step === 0 ? "solo-btn" : "";

		return (
			<FormWrapperStyle>
				<Form
					// disabled={steps[step].disabled}
					schema={steps[step].formSchema}
					uiSchema={steps[step].uischema}
					onSubmit={submitForm}>
					<FormControls className={formControlClass}>
						{step > 0 && (
							<Button type="primary" ghost>
								Terug
							</Button>
						)}
						<Button className="btn-next" htmlType="submit" type="primary">
							{step < steps.length - 1 ? "Volgende stap" : "Aanvraag afsluiten"}
						</Button>
					</FormControls>
				</Form>
			</FormWrapperStyle>
		);
	}
}
