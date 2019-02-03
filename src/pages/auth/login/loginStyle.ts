import { theme } from "@style/theme";
import styled from "styled-components";

export const LoginStyle = styled.div`
	display: grid;
	grid-template-areas: "sidebar";
	height: 100%;
		grid-template-columns: 1fr;

	@media screen and (min-width: 700px) {
		grid-template-columns: 1fr 1.5fr;
		grid-template-areas: "sidebar image";
	}

	@media screen and (min-width: 900px) {
		grid-template-columns: 1fr 2.5fr;
		grid-template-areas: "sidebar image";
	}
`;

export const LoginSidebar = styled.div`
	grid-area: sidebar;
	padding: 5rem;
	display: flex;
	justify-content: space-between;
	flex-flow: column;

	h1 {
		font-size: 3rem;
		margin-bottom: 2rem !important;
	}
`;

export const Logo = styled.img`
	max-width: 200px;
`;

export const LoginImage = styled.div`
	grid-area: image;
`;

export const LoginFooter = styled.div``;
interface HeaderImageProps {
	background: string;
}

export const HeaderImage = styled.div`
	position:relative;
	background:url('${(props: HeaderImageProps) => props.background}');
	background-position: center;
	background-size:cover;
	height: 100%;
	width:100%;
    z-index: 1;

	&:after{
		content:'';
		position:absolute;
		left:0;
		right: 0;
		top:0;
		bottom: 0;
		background: ${theme.dark};
		z-index: -1;
		opacity:.5;
	}
`;
