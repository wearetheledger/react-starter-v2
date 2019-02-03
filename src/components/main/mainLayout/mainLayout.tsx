import { MainLayoutProps, NavItem } from "@components/main/mainLayout/mainLayoutContainer";
import {
	Content,
	Header,
	Inner,
	Logo,
	MainLayoutStyle
} from "@components/main/mainLayout/mainLayoutStyle";
import { Layout, Menu } from "antd";
import { autobind } from "core-decorators";
import * as React from "react";
import { NavLink } from "react-router-dom";

interface State {}

@autobind
export class MainLayout extends React.Component<MainLayoutProps, State> {
	public static defaultProps: Partial<MainLayoutProps> = {
		header: true,
		contained: true
	};

	public render() {
		const { dark, sidenav, header, contained, renderItems, user, isAuthenticated } = this.props;

		const logo = dark
			? require("@assets/images/logo_white.svg")
			: require("@assets/images/logo_black.svg");

		const theme = dark ? "dark" : "light";

		let navItems: NavItem[] = [];

		if (renderItems) {
			navItems = renderItems(isAuthenticated, user);
		}

		return (
			<MainLayoutStyle>
				{header && (
					<Header theme={theme}>
						<Inner contained={contained}>
							<Logo src={logo} />
							<Menu theme={theme} mode="horizontal">
								{navItems
									.filter(n => n.shouldRender)
									.map(i => (
										<Menu.Item key={i.to}>
											{i.component ? (
												i.component
											) : (
												<NavLink to={i.to} exact={i.exact}>
													{i.name}
												</NavLink>
											)}
										</Menu.Item>
									))}
							</Menu>
						</Inner>
					</Header>
				)}
				<Content>
					<Inner contained={contained}>
						{/* <Breadcrumb style={{ margin: "16px 0" }}>
							<Breadcrumb.Item>Home</Breadcrumb.Item>
							<Breadcrumb.Item>List</Breadcrumb.Item>
							<Breadcrumb.Item>App</Breadcrumb.Item>
						</Breadcrumb> */}
						{this.props.children}
					</Inner>
				</Content>
				{/* <Layout.Footer style={{ textAlign: "center" }}>
					Ant Design ©2018 Created by Ant UED
				</Layout.Footer> */}
			</MainLayoutStyle>
		);
	}
}
