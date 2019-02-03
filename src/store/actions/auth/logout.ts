import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory("@@AUTH");

export interface LogoutActionProperties {

}

export const logout = actionCreator<LogoutActionProperties>("LOGOUT");
