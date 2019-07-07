import loginLock from "@assets/images/login-lock.jpg";
import logo from "@assets/images/logo_black.svg";
import { LoginForm, LoginFromValues } from "@components/auth/loginForm/loginForm";
import { LoginProps } from "@pages/auth/login/loginContainer";
import {
	HeaderImage,
	LoginFooter,
	LoginImage,
	LoginSidebar,
	LoginStyle,
	Logo
} from "@pages/auth/login/loginStyle";
import { API_URL } from "@utils/env";
import { Alert, Button } from "antd";
import { autobind } from "core-decorators";
import * as qs from "query-string";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Redirect } from "react-router";

interface State {
	error: boolean;
}

@autobind
export class Login extends React.Component<LoginProps, State> {
	public readonly state: State = {
		error: false
	};

	public componentDidMount() {
		const queryParams: { error?: boolean } = qs.parse(this.props.location.search);

		if (queryParams.error) {
			this.setState({
				error: true
			});
		}
	}

	public render() {
		const {
			location: { state },
			isAuthenticated,
			form,
			intl
		} = this.props;

		const { error } = this.state;

		if (isAuthenticated) {
			const redirectTo = (state || {}).redirectFrom || "/";

			return <Redirect to={redirectTo} />;
		}

		return (
			<LoginStyle>
				<LoginSidebar>
					<Logo src={logo} />
					<div>
						<h1>React starter v2</h1>
						{error && (
							<Alert
								message={intl.formatMessage({ id: "auth.login.failed" })}
								type="error"
							/>
						)}
						<LoginForm intl={intl} form={form} handleSubmit={this.handleSubmit} />
						<FormattedMessage id="auth.otherLogin" />
						<Button type="link" href={`${API_URL}/auth/auth0`}>
							Auth0
						</Button>
					</div>
					<LoginFooter>
						<FormattedMessage id="auth.poweredBy" />{" "}
						<a href="https://theledger.be">TheLedger</a>
					</LoginFooter>
				</LoginSidebar>
				<LoginImage>
					<HeaderImage background={loginLock} />
				</LoginImage>
			</LoginStyle>
		);
	}

	private handleSubmit(event: React.FormEvent) {
		event.preventDefault();

		const { form } = this.props;

		form.validateFields((errors, values: LoginFromValues) => {
			if (errors) {
				return;
			}
		});
	}
}
