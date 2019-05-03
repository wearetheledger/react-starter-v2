import { MainContainer } from "@pages/main/mainContainer";
import React from "react";
import renderer from "react-test-renderer";

it("should match snapshot", () => {
	const wrapper = renderer.create(<MainContainer />);
	const tree = wrapper.toJSON();
	expect(tree).toMatchSnapshot();
});
