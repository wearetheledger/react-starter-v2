import { MainLayoutProps, NavItem } from "@components/main/mainLayout/mainLayoutContainer";
import { Content, Header, Inner, Logo, MainLayoutStyle, SideLogoWrapper, Sider, Trigger } from "@components/main/mainLayout/mainLayoutStyle";
import { Layout, Menu } from "antd";
import { autobind } from "core-decorators";
import * as React from "react";
import { NavLink } from "react-router-dom";

interface State {
	collapsed: boolean;
}

@autobind
export class MainLayout extends React.Component<MainLayoutProps, State> {
	public static defaultProps: Partial<MainLayoutProps> = {
		header: true,
		contained: true
	};

	public readonly state: State = {
		collapsed: false
	};

	public get theme() {
		return this.props.dark ? "dark" : "light";
	}
	public get logo() {
		return this.props.dark
			? require("@assets/images/logo_white.svg")
			: require("@assets/images/logo_black.svg");
	}

	public render() {
		const { sidenav, header } = this.props;

		const icon = this.state.collapsed ? "menu-unfold" : "menu-fold";

		return (
			<MainLayoutStyle>
				{header && !sidenav && this.renderHeader()}

				{sidenav ? (
					<>
						{this.renderSideNav()}
						<Layout>
							<Layout.Header>
								<Trigger type={icon} onClick={this.toggle} />
							</Layout.Header>
							{this.renderContent()}
						</Layout>
					</>
				) : (
					this.renderContent()
				)}

				{/* <Layout.Footer style={{ textAlign: "center" }}>
					Ant Design ©2018 Created by Ant UED
				</Layout.Footer> */}
			</MainLayoutStyle>
		);
	}

	private toggle() {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}

	private renderSideNav() {
		return (
			<Sider
				width={300}
				theme={this.theme}
				trigger={null}
				collapsible
				breakpoint="lg"
				collapsedWidth="0"
				onCollapse={this.toggle}
				collapsed={this.state.collapsed}>
				<SideLogoWrapper>
					<Logo src={this.logo} />
				</SideLogoWrapper>

				<Menu theme={this.theme} mode="inline" defaultSelectedKeys={["1"]}>
					{this.renderNavItems(true)}
				</Menu>
			</Sider>
		);
	}

	private renderContent() {
		const { contained } = this.props;

		return (
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
		);
	}

	private renderHeader() {
		const { contained } = this.props;

		return (
			<Header theme={this.theme}>
				<Inner contained={contained}>
					<Logo src={this.logo} />
					<Menu theme={this.theme} mode="horizontal">
						{this.renderNavItems()}
					</Menu>
				</Inner>
			</Header>
		);
	}

	private renderNavItems(withIcon: boolean = false) {
		const { renderItems, user, isAuthenticated } = this.props;

		let navItems: NavItem[] = [];

		if (renderItems) {
			navItems = renderItems(isAuthenticated, user);
		}

		return navItems
			.filter(n => n.shouldRender)
			.map(i => (
				<Menu.Item key={i.to}>
					{i.component ? (
						i.component
					) : (
						<NavLink to={i.to} exact={i.exact}>
							{withIcon && i.icon}
							{i.name}
						</NavLink>
					)}
				</Menu.Item>
			));
	}
}
