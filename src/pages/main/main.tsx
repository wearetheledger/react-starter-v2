import { APIService } from "@api/swagger";
import { MainProps } from "@pages/main/mainContainer";
import { MainStyle } from "@pages/main/mainStyle";
import { autobind } from "core-decorators";
import * as React from "react";

interface State {}

@autobind
export class Main extends React.Component<MainProps, State> {
	public componentDidMount() {
		APIService.getCars({}).then(cars => {
			console.log(cars);
		});
	}
	public render() {
		return (
			<MainStyle>
				<h1>Home</h1>
			</MainStyle>
		);
	}
}
