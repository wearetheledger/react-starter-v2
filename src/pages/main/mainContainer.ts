import { Main } from "@pages/main/main";
import { compose } from "redux";

export interface MainContainerProps {}

export const MainContainer = compose<React.ComponentType<MainContainerProps>>()(Main);

export type MainProps = MainContainerProps;
