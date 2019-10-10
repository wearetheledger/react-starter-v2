import { FormWrapperContainer } from "@components/form/formWrapper/formWrapperContainer";
import React from "react";
import renderer from "react-test-renderer";

it("should match snapshot", () => {
	const wrapper = renderer.create(<FormWrapperContainer />);
	const tree = wrapper.toJSON();
	expect(tree).toMatchSnapshot();
});
