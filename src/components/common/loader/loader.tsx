import * as React from "react";
import { LoaderStyle } from "@components/common/loader/loaderStyle";
import { Spin, Icon } from "antd";

export interface LoaderProps {}

export const Loader: React.StatelessComponent<LoaderProps> = (props: LoaderProps) => {
	return (
		<LoaderStyle>
			<Spin indicator={<Icon type="loading" style={{ fontSize: 38 }} spin />} />
		</LoaderStyle>
	);
};
