import { LoginForm } from "@components/auth/loginForm/loginForm";
import React from "react";
import { createRendererWithProvider } from "__tests__/helpers/createRendererWithProvider";
import { mockForm } from "__tests__/helpers/mockForm";
import { mockIntl } from "__tests__/helpers/mockIntl";

it("should match snapshot", () => {
	const wrapper = createRendererWithProvider(
		<LoginForm intl={mockIntl} form={mockForm} handleSubmit={jest.fn()} />
	)();
	const tree = wrapper.toJSON();
	expect(tree).toMatchSnapshot();
});
