import { LoginSuccessProps } from "@pages/auth/loginSuccess/loginSuccessContainer";
import { autobind } from "core-decorators";
import * as qs from "query-string";
import * as React from "react";
import { Redirect } from "react-router";

interface State {
	loading: boolean;
}

@autobind
export class LoginSuccess extends React.Component<LoginSuccessProps, State> {
	public readonly state: State = {
		loading: true
	};

	public componentDidMount() {
		const queryParams: { jwt?: string } = qs.parse(this.props.location.search);

		if (queryParams.jwt) {
			this.props.login(queryParams.jwt);
		}

		this.setState({
			loading: false
		});
	}
	public render() {
		if (!this.state.loading) {
			return <Redirect to="/" />;
		}

		return null;
	}
}
