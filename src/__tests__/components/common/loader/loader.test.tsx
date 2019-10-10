import { Loader } from "@components/common/loader/loader";
import React from "react";
import renderer from "react-test-renderer";

it("should match snapshot", () => {
	const wrapper = renderer.create(<Loader />);
	const tree = wrapper.toJSON();
	expect(tree).toMatchSnapshot();
});
