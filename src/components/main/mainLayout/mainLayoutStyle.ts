import { theme } from "@style/theme";
import { Icon, Layout } from "antd";
import styled, { css } from "styled-components";

export const containedCss = css`
	margin: 0 auto;
	// Small devices (landscape phones, 576px and up)
	@media (min-width: 576px) {
		max-width: 576px;
	}

	// Medium devices (tablets, 768px and up)
	@media (min-width: 768px) {
		max-width: 768px;
	}

	// Large devices (desktops, 992px and up)
	@media (min-width: 992px) {
		max-width: 992px;
	}

	// Extra large devices (large desktops, 1200px and up)
	@media (min-width: 1200px) {
		max-width: 1200px;
	}
`;

interface InnerProps {
	contained?: boolean;
}
export const Inner = styled.div`
	${(props: InnerProps) => props.contained && containedCss}
`;

export const MainLayoutStyle = styled(Layout)`
	height: 100%;
`;

interface HeaderProps {
	theme: "light" | "dark";
}

export const Header = styled(Layout.Header)`
	${(props: HeaderProps) =>
		props.theme === "light" &&
		css`
			background: #fff;
		`}

	${Inner} {
		display: flex;
		justify-content: space-between;
	}
	.ant-menu {
		line-height: 62px;
	}
`;

interface SiderProps {
	theme: "light" | "dark";
}

export const Sider = styled(Layout.Sider)`
	${(props: SiderProps) =>
		props.theme === "light" &&
		css`
			background: ${theme.light};
		`}

	& + .ant-layout .ant-layout-header {
		background: transparent;
	}

	.ant-menu-item.ant-menu-item-selected {
		background: initial;
		&:after {
			display: none;
		}
	}

	a {
		padding: 0 15px;
		&.active {
			color: ${theme.primary};
			background: ${theme.primaryDesaturated1};
			/* border-radius: 10px; */
			font-weight: 600;
		}
	}
`;

interface ContentProps {
	contained?: boolean;
}

export const Content = styled(Layout.Content)`
	${(props: ContentProps) => props.contained && containedCss}
	${(props: ContentProps) =>
		!props.contained &&
		css`
			padding: 0 50px;
		`}
`;

export const SideLogoWrapper = styled.div`
	display: flex;
	padding: 0 24px;
	height: 64px;
	align-items: center;
`;

export const Logo = styled.img`
	max-width: 150px;
	float: left;
	margin-right: 1rem;
`;

export const Trigger = styled(Icon)`
	font-size: 2rem;
`;
