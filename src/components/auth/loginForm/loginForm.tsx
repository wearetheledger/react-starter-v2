import { requiredRule } from "@utils/rules/requiredRule";
import { Button, Form, Icon, Input } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
import { FormattedMessage, InjectedIntl } from "react-intl";

export interface LoginFormProps {
	form: WrappedFormUtils;
	intl: InjectedIntl;
	handleSubmit(e: React.FormEvent): void;
}

export interface LoginFromValues {
	userName: string;
	password: string;
}

export const LoginForm: React.StatelessComponent<LoginFormProps> = props => {
	const {
		form: { getFieldDecorator },
		handleSubmit,
		intl
	} = props;

	return (
		<Form onSubmit={handleSubmit} className="login-form">
			<Form.Item>
				{getFieldDecorator("userName", {
					rules: [requiredRule]
				})(
					<Input
						size="large"
						prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
						// tslint:disable-next-line: no-any
						placeholder={intl.formatMessage({ id: "auth.username" })}
					/>
				)}
			</Form.Item>
			<Form.Item>
				{getFieldDecorator("password", {
					rules: [requiredRule]
				})(
					<Input
						size="large"
						prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
						type="password"
						placeholder={intl.formatMessage({ id: "auth.password" })}
					/>
				)}
			</Form.Item>
			<Form.Item>
				<Button size="large" type="primary" htmlType="submit" block={true}>
					<FormattedMessage id="auth.login" />
				</Button>
			</Form.Item>
		</Form>
	);
};
