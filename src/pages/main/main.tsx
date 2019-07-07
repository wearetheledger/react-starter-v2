import { APIService } from "@api/swagger";
import { MainProps } from "@pages/main/mainContainer";
import { MainStyle } from "@pages/main/mainStyle";
import { autobind } from "core-decorators";
import * as React from "react";

interface State {}

@autobind
export class Main extends React.Component<MainProps, State> {
	public componentDidMount() {
		// Example HTTP request
		APIService.myAsset.$getMyAssetById("1").then(myAsset => {
			console.log(myAsset);
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
