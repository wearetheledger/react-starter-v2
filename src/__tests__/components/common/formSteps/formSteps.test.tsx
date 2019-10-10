import { FormStepsContainer } from "@components/common/formSteps/formStepsContainer";
import React from "react";
import renderer from "react-test-renderer";

it("should match snapshot", () => {
	const wrapper = renderer.create(<FormStepsContainer />);
	const tree = wrapper.toJSON();
	expect(tree).toMatchSnapshot();
});
