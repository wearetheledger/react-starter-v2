import { FormPageContainer } from "@pages/formPage/formPageContainer";
import React from "react";
import renderer from "react-test-renderer";

it("should match snapshot", () => {
	const wrapper = renderer.create(<FormPageContainer />);
	const tree = wrapper.toJSON();
	expect(tree).toMatchSnapshot();
});
