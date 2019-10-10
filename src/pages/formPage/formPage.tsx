import { autobind } from "core-decorators";
import * as React from "react";

import { FormPageProps } from "@pages/formPage/formPageContainer";
import { FormPageStyle, FormHeader } from "@pages/formPage/formPageStyle";
import { Row, Col, Button } from "antd";
import { FormStepsContainer } from "@components/common/formSteps/formStepsContainer";
import { Loader } from "@components/common/loader/loader";
import { Application, ApplicationService } from "@api/applicationService";
import { FormWrapperContainer } from "@components/form/formWrapper/formWrapperContainer";

interface State {
	step: number;
	application?: Application;
}

@autobind
export class FormPage extends React.Component<FormPageProps, State> {
	public readonly state: State = {
		step: 0
	};

	public async componentDidMount() {
		const application = await ApplicationService.GetApplicationById(
			this.props.match.params.applicationId
		);
		this.setState({
			application
		});
	}

	public render() {
		const { step, application } = this.state;
		if (!application) {
			return <Loader />;
		}

		return (
			<FormPageStyle>
				<Row>
					<Col span={24}>
						<FormHeader>
							<h1>{application.form.title}</h1>
							<Button type="primary" ghost>
								Aanvraag tijdelijk afsluiten
							</Button>
						</FormHeader>
					</Col>
				</Row>
				<Row>
					<Col span={6}>
						<FormStepsContainer step={step} steps={application.form.steps} />
					</Col>
					<Col span={18}>
						<FormWrapperContainer
							steps={application.form.steps}
							step={step}
							submitForm={this.submitForm}
						/>
					</Col>
				</Row>
			</FormPageStyle>
		);
	}

	private submitForm(formData: Todo) {
		console.log(formData);
		this.setState({ step: this.state.step + 1 });
	}
}
