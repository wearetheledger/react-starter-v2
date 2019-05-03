import { LoginContainer } from "@pages/auth/login/loginContainer";
import React from "react";
import { Route } from "react-router";
import { createRendererWithProvider } from "__tests__/helpers/createRendererWithProvider";

it("should match snapshot", () => {
	const wrapper = createRendererWithProvider(<Route component={LoginContainer} />)();
	const tree = wrapper.toJSON();
	expect(tree).toMatchSnapshot();
});
